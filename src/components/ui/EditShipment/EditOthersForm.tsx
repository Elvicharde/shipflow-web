import React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePatchShipment } from '@/app/api/shipments-api';
import Button from '../Button';
import { useGetShipmentBySession } from '@/app/api/shipments-api';
import { Shipment } from '@/types/shipment';

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
      form.reset({
        order_number: data.order_number ?? '',
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: OthersForm) => {
    try {
      await patchShipment.mutateAsync({
        order_number: formData.order_number ?? undefined,
      });
      toast.success('Order number updated successfully');
      refetch?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update order number');
    }
  };

  if (isLoading) {
    return <div>Loading order number...</div>;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
      <Button type="submit" className="w-full mt-2">
        Save
      </Button>
    </form>
  );
};

export default EditOthersForm;
