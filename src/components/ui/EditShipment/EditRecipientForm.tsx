import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  usePatchShipment,
  useGetShipmentBySession,
} from '@/app/api/shipments-api';
import { EditRecipientData } from '@/types/shipment';
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

interface EditRecipientFormProps {
  sessionId: string;
  shipmentId: string | number;
  onClose: () => void;
  refetch?: () => void;
}

const EditRecipientForm: React.FC<EditRecipientFormProps> = ({
  sessionId,
  shipmentId,
  onClose,
  refetch,
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const patchShipment = usePatchShipment(shipmentId);
  const { data, isLoading } = useGetShipmentBySession<EditRecipientData>({
    sessionId,
    shipmentId,
    fields: 'ship_to',
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
      const address = (data as any).ship_to || data;
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
    // Convert nulls to undefined for optional fields
    const sanitizedFormData = {
      ...formData,
      address_line2: formData.address_line2 ?? undefined,
      state: formData.state ?? undefined,
      phone: formData.phone ?? undefined,
    };
    try {
      await patchShipment.mutateAsync({ ship_to: sanitizedFormData });
      toast.success('Recipient updated successfully');
      refetch?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update recipient');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <FormRequestLoader message="Loading recipient information..." />;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <p className="text-lg font-semibold mb-8">Update Recipient Information</p>
      {Object.keys(form.getValues()).map((field) => (
        <div key={field}>
          <label className="block text-xs font-medium mb-1">
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
          Update Recipient
          {submitting && <ButtonLoader />}
        </Button>
      </div>
    </form>
  );
};

export default EditRecipientForm;
