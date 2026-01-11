import React, { useRef, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { WizardHook } from '@/hooks/useWizard';

interface Step1UploadProps {
  wizard: WizardHook;
}

const Step1Upload: React.FC<Step1UploadProps> = ({ wizard }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError('File size exceeds 50MB.');
        return;
      }
      if (!file.name.endsWith('.csv')) {
        setError('Only .csv files are supported.');
        return;
      }
      wizard.simulateImport(file);
    }
  };

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
    setError(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError('File size exceeds 50MB.');
        return;
      }
      if (!file.name.endsWith('.csv')) {
        setError('Only .csv files are supported.');
        return;
      }
      wizard.simulateImport(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    wizard.setMapping({});
    wizard.setValidation({});
    wizard.setPricing({});
    // Optionally clear file/import state here if needed
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Upload Shipment Data</h2>
      <p className="text-gray-500 mb-6">
        Upload your shipment CSV file to begin the bulk processing wizard.
        Ensure your file matches our standard format.
      </p>
      <div
        className="border-2 border-dashed rounded-xl p-8 bg-[#F9FAFB] mb-6 flex flex-col items-center justify-center relative transition-colors duration-200"
        style={{
          borderColor: dragActive ? '#2563eb' : '#E5E7EB',
          background: dragActive ? '#EFF6FF' : '#F9FAFB',
        }}
      >
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
              Maximum file size 50MB. Supported format:{' '}
              <span className="font-semibold">.csv</span>
            </div>
            <Button
              type="button"
              onClick={handleBrowseClick}
              className="mb-2 px-6 py-2 bg-blue-600 text-white rounded font-semibold shadow-none"
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
            />
            {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
            {wizard.csvFile && wizard.csvFile.name && (
              <div className="mt-2 text-green-600 text-sm">
                Selected: {wizard.csvFile.name}
              </div>
            )}
          </div>
        </label>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F9FAFB] border border-[#E4E7EC] rounded-lg px-4 py-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <rect width="20" height="20" rx="4" fill="#E3F6FC" />
            <path
              d="M7 10h6M10 7v6"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Don't have a file yet?</span>
          <a
            href="/sample-template.csv"
            download
            className="text-blue-600 hover:underline font-medium ml-1"
          >
            Download CSV Template
          </a>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button
            type="button"
            variant="outline"
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded font-semibold shadow-none disabled:opacity-60"
            onClick={wizard.nextStep}
            disabled={!wizard.csvFile || wizard.imported === false}
          >
            Continue
          </Button>
        </div>
      </div>
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
    