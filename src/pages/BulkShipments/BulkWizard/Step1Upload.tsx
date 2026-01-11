import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { WizardHook } from './useWizard';

interface Step1UploadProps {
  wizard: WizardHook;
}

const Step1Upload: React.FC<Step1UploadProps> = ({ wizard }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ file: FileList }>();

  const onSubmit = (data: { file: FileList }) => {
    if (data.file && data.file.length > 0) {
      wizard.simulateImport(data.file[0]);
      reset();
    }
  };

  return (
    <div className="step-upload">
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="file"
            accept=".csv"
            {...register('file', { required: 'File is required' })}
          />
          {errors.file && (
            <span className="text-red-500 text-xs">{errors.file.message}</span>
          )}
        </div>
        <Button
          type="submit"
          disabled={wizard.imported === false && wizard.csvFile !== null}
        >
          {wizard.imported === false && wizard.csvFile !== null
            ? 'Importing...'
            : 'Upload'}
        </Button>
        {wizard.imported && wizard.csvFile && (
          <div className="mt-2 text-green-600 text-sm">
            File imported: {wizard.csvFile.name}
          </div>
        )}
      </form>
    </div>
  );
};

export default Step1Upload;
