import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { WizardHook } from '../../../hooks/useWizard';
import { useAppStore } from '@/app/store';
import { UploadResponse, UploadResult } from '@/types';
import { useGetUploadedShipments } from '@/app/api/upload-api';
import { DataTable } from '@/components/ui/DataTable';
import { getBulkWizardColumns } from './bulkWizardColumns';
import { useDeleteShipment } from '@/app/api/shipments-api';

interface Step2MapValidationProps {
  wizard: WizardHook;
}

const Step2MapValidation: React.FC<Step2MapValidationProps> = ({ wizard }) => {
  const uploadResponse: UploadResponse | null = useAppStore(
    (s) => s.uploadResponse,
  );
  const sessionId = uploadResponse?.upload_session_id || null;
  const {
    data: sessionShipments,
    refetch,
    isFetching,
  } = useGetUploadedShipments(sessionId as string);
  const filename = useAppStore((s) => s.filename);

  const results: UploadResult[] =
    sessionShipments?.results || uploadResponse?.results || [];
  const total = results.length;
  const valid = uploadResponse?.created ?? 0;
  const invalid = uploadResponse?.invalid ?? 0;

  // Filter state for valid/invalid rows
  const [filter, setFilter] = useState<'all' | 'valid' | 'invalid'>('all');
  const [tableResults, setTableResults] = useState<UploadResult[]>(results);
  React.useEffect(() => {
    setTableResults(results);
  }, [results]);
  const filteredResults =
    filter === 'all'
      ? tableResults
      : tableResults.filter((row) =>
          filter === 'valid'
            ? row.status === 'valid'
            : row.status === 'invalid',
        );

  // Edit modal state
  const [editRow, setEditRow] = useState<UploadResult | null>(null);
  const handleEdit = (row: UploadResult) => {
    setEditRow(row);
  };
  const deleteShipmentMutation = useDeleteShipment();
  const handleDelete = (row: UploadResult) => {
    if (!row.shipment_id) return;
    deleteShipmentMutation.mutate(row.shipment_id, {
      onSuccess: () => {
        setTableResults((prev) =>
          prev.filter((r) => r.shipment_id !== row.shipment_id),
        );
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-full mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        Almost there! Review your data and fix any validation errors before
        final processing.
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#F9FAFB] rounded-lg p-4 flex flex-col items-center border border-gray-100">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-xs text-gray-500">Total Shipments</div>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg p-4 flex flex-col items-center border border-green-200">
          <div className="text-2xl font-bold text-green-600">{valid}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            Valid Shipments <span className="text-green-500">&#10003;</span>
          </div>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg p-4 flex flex-col items-center border border-red-200">
          <div className="text-2xl font-bold text-red-600">{invalid}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            Invalid Shipments <span className="text-red-500">&#10007;</span>
          </div>
        </div>
      </div>
      {/* Table Batch Info */}
      <div className="flex items-center gap-2 mb-2 justify-between">
        <div>
          <span className="font-semibold text-base">Shipment Data</span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded ml-2">
            CSV UPLOAD:{' '}
            {filename || uploadResponse?.upload_session_id || 'Batch'}
          </span>
        </div>
        <div className="ml-4 flex gap-2 ">
          <Button
            variant="primary"
            onClick={() => setFilter('all')}
            className="w-16! h-9!"
          >
            All
          </Button>
          <Button
            variant="primary"
            onClick={() => setFilter('valid')}
            className="w-16! h-9!"
          >
            Valid
          </Button>
          <Button
            variant="primary"
            onClick={() => setFilter('invalid')}
            className="w-16! h-9!"
          >
            Invalid
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={getBulkWizardColumns(
            (row) => {}, // edit handled in popover
            handleDelete,
            sessionId || '',
          )}
          data={filteredResults}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="primary"
          className="h-9! w-20!"
          onClick={() => wizard.prevStep()}
        >
          Back
        </Button>
        <Button
          variant="confirm"
          className="h-9!"
          onClick={() => wizard.nextStep()}
          disabled={valid === 0}
        >
          Process {valid} Shipments
        </Button>
      </div>
    </div>
  );
};

export default Step2MapValidation;
