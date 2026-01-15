import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from 'zod';
import {
  usePatchShipment,
  useGetShipmentBySession,
} from '@/app/api/shipments-api';
import { EditSenderData } from '@/types/shipment';
import Button from '../Button';
import FormRequestLoader from './FormRequestLoader';
import ButtonLoader from '../loaders/button-loader';

const addressSchema = z.object({
  name: z.string().min(1, 'Required'),
  address_line1: z.string().min(1, 'Required'),
  address_line2: z.string().optional().nullable(),
  city: z.string().min(1, 'Required'),
  state: z.string().optional().nullable(),
  postal_code: z.string().min(1, 'Required'),
  phone: z.string().optional().nullable(),
});

type AddressForm = z.infer<typeof addressSchema>;

interface EditSenderFormProps {
  sessionId: string;
  shipmentId: string | number;
  onClose: () => void;
  refetch?: () => void;
}

const EditSenderForm: React.FC<EditSenderFormProps> = ({
  sessionId,
  shipmentId,
  onClose,
  refetch,
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const patchShipment = usePatchShipment(shipmentId);
  const { data, isLoading } = useGetShipmentBySession<EditSenderData>({
    sessionId,
    shipmentId,
    fields: 'ship_from',
  });

  const form = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (data) {
      // If data is nested (e.g., { ship_from: { ... } }), use data.ship_from
      const address = (data as any).ship_from || data;
      form.reset({
        name: address.name || '',
        address_line1: address.address_line1 || '',
        address_line2: address.address_line2 || '',
        city: address.city || '',
        state: address.state || '',
        postal_code: address.postal_code || '',
        phone: address.phone || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (formData: AddressForm) => {
    setSubmitting(true);
    const sanitizedFormData = {
      ...formData,
      address_line2: formData.address_line2 ?? undefined,
      state: formData.state ?? undefined,
      phone: formData.phone ?? undefined,
    };
    try {
      await patchShipment.mutateAsync({ ship_from: sanitizedFormData });
      toast.success('Sender updated successfully!');
      refetch?.();
      onClose();
    } catch (error: any) {
      toast.error('Failed to update sender. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <FormRequestLoader message="Loading sender information..." />;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <p className="text-lg font-semibold mb-8">Update Sender Information</p>
      {Object.keys(form.getValues()).map((field) => (
        <div key={field}>
          <label className="block text-xs font-medium mb-1 capitalize">
            {field.replace(/_/g, ' ')}
          </label>
          <input
            className="w-full border rounded px-2 py-1"
            {...form.register(field as keyof AddressForm)}
          />
          {form.formState.errors[field as keyof AddressForm] && (
            <div className="text-red-500 text-xs">
              {(form.formState.errors as any)[field]?.message}
            </div>
          )}
        </div>
      ))}
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
          Update Sender
          {submitting && <ButtonLoader />}
        </Button>
      </div>
    </form>
  );
};

export default EditSenderForm;
