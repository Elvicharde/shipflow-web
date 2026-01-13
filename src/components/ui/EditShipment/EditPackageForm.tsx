import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  usePatchShipment,
  useGetShipmentBySession,
} from '@/app/api/shipments-api';
import { EditPackageData } from '@/types/shipment';
import Button from '../Button';

const packageSchema = z.object({
  length_in: z.number().min(0),
  width_in: z.number().min(0),
  height_in: z.number().min(0),
  weight_lbs: z.number().min(0),
  weight_oz: z.number().min(0).max(15),
});

type PackageForm = z.infer<typeof packageSchema>;

interface EditPackageFormProps {
  sessionId: string;
  shipmentId: string | number;
  onClose: () => void;
  refetch?: () => void;
}

const EditPackageForm: React.FC<EditPackageFormProps> = ({
  sessionId,
  shipmentId,
  onClose,
  refetch,
}) => {
  const patchShipment = usePatchShipment(shipmentId);
  const { data, isLoading } = useGetShipmentBySession<EditPackageData>({
    sessionId,
    shipmentId,
    fields: 'package',
  });
  const form = useForm<PackageForm>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      length_in: 0,
      width_in: 0,
      height_in: 0,
      weight_lbs: 0,
      weight_oz: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        length_in: Number(data.length_in ?? 0),
        width_in: Number(data.width_in ?? 0),
        height_in: Number(data.height_in ?? 0),
        weight_lbs: Number(data.weight_lbs ?? 0),
        weight_oz: Number(data.weight_oz ?? 0),
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: PackageForm) => {
    await patchShipment.mutateAsync({ package: formData });
    refetch?.();
    onClose();
  };

  if (isLoading) {
    return <div>Loading package data...</div>;
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
            type="number"
            step="any"
            {...form.register(field as keyof PackageForm)}
          />
          {form.formState.errors[field as keyof PackageForm] && (
            <div className="text-red-500 text-xs">
              {(form.formState.errors as any)[field]?.message}
            </div>
          )}
        </div>
      ))}
      <Button type="submit" className="w-full mt-2">
        Save Package
      </Button>
    </form>
  );
};

export default EditPackageForm;
