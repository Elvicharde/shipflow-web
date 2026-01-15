import React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePatchShipment } from '@/app/api/shipments-api';
import Button from '../Button';
import { useGetShipmentBySession } from '@/app/api/shipments-api';
import { Shipment } from '@/types/shipment';
import FormRequestLoader from './FormRequestLoader';
import { fi } from 'zod/v4/locales';
import ButtonLoader from '../loaders/button-loader';

const othersSchema = z.object({
  order_number: z.string().optional().nullable(),
});

type OthersForm = z.infer<typeof othersSchema>;

interface EditOthersFormProps {
  sessionId: string;
  shipmentId: string | number;
  onClose: () => void;
  refetch?: () => void;
}

const EditOthersForm: React.FC<EditOthersFormProps> = ({
  sessionId,
  shipmentId,
  onClose,
  refetch,
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const patchShipment = usePatchShipment(shipmentId);
  const { data, isLoading } = useGetShipmentBySession<Shipment>({
    sessionId,
    shipmentId,
  });
  const form = useForm<OthersForm>({
    resolver: zodResolver(othersSchema),
    defaultValues: {
      order_number: '',
    },
  });

  React.useEffect(() => {
    if (data) {
      // If data is nested (e.g., { order_number: ... } or { others: { order_number: ... } })
      const others = (data as any).others || data;
      form.reset({
        order_number: others.order_number || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (formData: OthersForm) => {
    setSubmitting(true);
    try {
      await patchShipment.mutateAsync({
        order_number: formData.order_number ?? undefined,
      });
      toast.success('Order number updated successfully');
      refetch?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update order number');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <FormRequestLoader message="Loading order number information..." />;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <p className="text-lg font-semibold mb-8">Update Order Information</p>
      <div>
        <label className="block text-xs font-medium mb-1">Order Number</label>
        <input
          className="w-full border rounded px-2 py-1"
          {...form.register('order_number')}
        />
        {form.formState.errors.order_number && (
          <div className="text-red-500 text-xs">
            {(form.formState.errors as any).order_number?.message}
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-end gap-2 mt-12">
        <Button className="px-4 h-9!" variant="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="confirm"
          className="px-6 h-9!"
          disabled={submitting}
        >
          Update Order Number
          {submitting && <ButtonLoader />}
        </Button>
      </div>
    </form>
  );
};

export default EditOthersForm;
