import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  usePatchShipment,
  useGetShipmentBySession,
} from '@/app/api/shipments-api';
import { EditSenderData } from '@/types/shipment';
import Button from '../Button';

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
  const patchShipment = usePatchShipment(shipmentId);
  const { data, isLoading } = useGetShipmentBySession<EditSenderData>({
    sessionId,
    shipmentId,
    fields: 'ship_from',
  });

  console.log(data);
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
      form.reset({
        name: data.name ?? '',
        address_line1: data.address_line1 ?? '',
        address_line2: data.address_line2 ?? '',
        city: data.city ?? '',
        state: data.state ?? '',
        postal_code: data.postal_code ?? '',
        phone: data.phone ?? '',
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: AddressForm) => {
    const sanitizedFormData = {
      ...formData,
      address_line2: formData.address_line2 ?? undefined,
      state: formData.state ?? undefined,
      phone: formData.phone ?? undefined,
    };
    await patchShipment.mutateAsync({ ship_from: sanitizedFormData });
    refetch?.();
    onClose();
  };

  if (isLoading) {
    return <div>Loading sender data...</div>;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
      <Button type="submit" className="w-full mt-2">
        Save Sender
      </Button>
    </form>
  );
};

export default EditSenderForm;
