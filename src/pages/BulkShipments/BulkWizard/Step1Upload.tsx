import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../components/ui/Button';
import LoaderComponent from '../../../components/ui/LoaderComponent';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import useUploadShipments from '@/app/api/upload-api';
import { useAppStore } from '@/app/store';
import { WizardHook } from '@/hooks/useWizard';
import {
  uploadCsvSchema,
  MAX_FILE_SIZE,
} from '../../../types/validations/upload-zod-schema';
import type { UploadCsvSchema } from '../../../types/validations/upload-zod-schema';

interface Step1UploadProps {
  wizard: WizardHook;
}

const Step1Upload: React.FC<Step1UploadProps> = ({ wizard }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<UploadCsvSchema>({
    resolver: zodResolver(uploadCsvSchema),
  });

  const file = watch('file');

  // Use mutation hook for upload
  const uploadMutation = useUploadShipments();
  const setUploadResponse = useAppStore((s) => s.setUploadResponse);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    setApiError(null);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setValue('file', droppedFile, { shouldValidate: true });
      wizard.setCsvFile(droppedFile);
      setCompleted(false);
      setProgress(0);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setApiError(null);
    reset();
    setCompleted(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    wizard.goToStep(0); // Optionally reset to first step
    wizard.setMapping({});
    wizard.setValidation({});
    wizard.setPricing({});
    navigate(-1);
  };

  // File input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue('file', selectedFile, { shouldValidate: true });
      wizard.setCsvFile(selectedFile);
      setCompleted(false);
    }
  };

  // Upload logic using mutation
  const onSubmit = async (data: UploadCsvSchema) => {
    setApiError(null);
    setProgress(0);
    setCompleted(false);
    setUploading(true);

    // uploadMutation now expects a File object
    uploadMutation.mutate(data.file, {
      onSuccess: (response) => {
        setProgress(100);
        setUploading(false);
        setCompleted(true);
        setUploadResponse(response);
      },
      onError: () => {
        setApiError('Failed to upload file. Please try again.');
      },
      onSettled: () => {
        // No-op, handled by onSuccess/onError
      },
    });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Upload Shipment Data</h2>
      <p className="text-gray-500 mb-6">
        Upload your shipment CSV file to begin the bulk processing wizard.
        Ensure your file matches our standard format.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="border-2 border-dashed rounded-xl p-8 bg-[#F9FAFB] mb-6 flex flex-col items-center justify-center relative transition-colors duration-200"
          style={{
            borderColor: dragActive ? '#2563eb' : '#E5E7EB',
            background: dragActive ? '#EFF6FF' : '#F9FAFB',
          }}
        >
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <label
                htmlFor="csv-upload"
                className="flex flex-col items-center justify-center w-full h-56 cursor-pointer"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M12 16V4m0 0L8 8m4-4 4 4"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="3"
                        y="16"
                        width="18"
                        height="4"
                        rx="2"
                        fill="#2563eb"
                        fillOpacity=".08"
                      />
                    </svg>
                  </div>
                  <div className="text-lg font-medium mb-1">
                    Drag &amp; drop CSV file or click to browse
                  </div>
                  <div className="text-xs text-gray-400 mb-4">
                    Maximum file size{' '}
                    {(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB. Supported
                    format: <span className="font-semibold">.csv</span>
                  </div>
                  <Button
                    type="button"
                    onClick={handleBrowseClick}
                    className="w-10 mb-2 px-6 py-2 bg-blue-600 text-white rounded font-semibold shadow-none"
                    disabled={uploading}
                  >
                    Select File
                  </Button>
                  <input
                    id="csv-upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  {errors.file && (
                    <div className="text-red-500 text-xs mt-2">
                      {errors.file.message}
                    </div>
                  )}
                  {apiError && (
                    <div className="text-red-500 text-xs mt-2">{apiError}</div>
                  )}
                  {wizard.csvFile && wizard.csvFile.name && (
                    <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      Selected: {wizard.csvFile.name}
                    </div>
                  )}
                  {uploading && (
                    <div className="flex items-center gap-2 mt-4">
                      <LoaderComponent />
                      <div className="w-40 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-blue-500 rounded transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs">{progress}%</span>
                    </div>
                  )}
                  {completed && (
                    <div className="flex items-center gap-2 mt-4 text-green-600 text-sm">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      File uploaded successfully!
                    </div>
                  )}
                </div>
              </label>
            )}
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 bg-[#F9FAFB] border border-[#E4E7EC] rounded-lg px-4 py-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xs">Don't have a file yet?</span>
            <a
              href="/template/template.csv"
              download
              className="text-blue-600 hover:underline font-medium ml-1 text-xs"
            >
              Download CSV Template
            </a>
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer px-6 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 h-9"
              onClick={handleCancel}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer h-9 px-6 bg-blue-600 text-white rounded font-semibold shadow-none disabled:opacity-60"
              disabled={!file || uploading || completed}
            >
              Upload File
            </Button>
            <Button
              type="button"
              className="cursor-pointer h-9 px-6 bg-green-600 text-white rounded font-semibold shadow-none disabled:opacity-60"
              onClick={wizard.nextStep}
              disabled={!completed}
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
      <div className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded px-3 py-2 mt-2">
        <span className="font-semibold">Important:</span> Make sure your CSV
        contains required columns like <b>'Destination Address'</b>,{' '}
        <b>'Package Weight'</b>, and <b>'Service Type'</b>.{' '}
        <a href="#" className="underline font-medium ml-1">
          View Documentation
        </a>
      </div>
    </div>
  );
};

export default Step1Upload;
