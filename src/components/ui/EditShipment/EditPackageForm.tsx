import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  usePatchShipment,
  useGetShipmentBySession,
} from '@/app/api/shipments-api';
import { EditPackageData } from '@/types/shipment';
import Button from '../Button';
import FormRequestLoader from './FormRequestLoader';
import ButtonLoader from '../loaders/button-loader';

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
  const [submitting, setSubmitting] = React.useState(false);
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
      const pkg = (data as any).package || data;
      form.reset({
        length_in: Number(pkg.length_in) || 0,
        width_in: Number(pkg.width_in) || 0,
        height_in: Number(pkg.height_in) || 0,
        weight_lbs: Number(pkg.weight_lbs) || 0,
        weight_oz: Number(pkg.weight_oz) || 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (formData: PackageForm) => {
    setSubmitting;
    try {
      await patchShipment.mutateAsync({ package: formData });
      toast.success('Package updated successfully');
      refetch?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update package');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <FormRequestLoader message="Loading package information..." />;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <p className="text-lg font-semibold mb-8">Update Package Information</p>
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
          Update Package
          {submitting && <ButtonLoader />}
        </Button>
      </div>
    </form>
  );
};

export default EditPackageForm;
