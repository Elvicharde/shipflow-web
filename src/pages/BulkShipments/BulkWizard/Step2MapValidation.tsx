import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { WizardHook } from '../../../hooks/useWizard';
import { SHIPMENT_VALIDATION_DATA } from '../../../utils/shipmentValidationSeed';

interface Step2MapValidationProps {
  wizard: WizardHook;
}

const Step2MapValidation: React.FC<Step2MapValidationProps> = ({ wizard }) => {
  useEffect(() => {
    if (!wizard.csvData || wizard.csvData.length === 0) {
      wizard.setMapping({});
      wizard.setValidation({});
      wizard.setPricing({});
    }
  }, []);

  const [filter, setFilter] = useState<'all' | 'valid' | 'warning' | 'error'>(
    'all',
  );
  const [showErrorsOnly, setShowErrorsOnly] = useState(false);

  const total = wizard.csvData.length;
  const valid = wizard.csvData.filter(
    (row: any) => row.status === 'valid',
  ).length;
  const warnings = wizard.csvData.filter(
    (row: any) => row.status === 'warning',
  ).length;
  const errors = wizard.csvData.filter(
    (row: any) => row.status === 'error',
  ).length;

  let filteredRows = wizard.csvData;
  if (filter !== 'all') {
    filteredRows = filteredRows.filter((row: any) => row.status === filter);
  }
  if (showErrorsOnly) {
    filteredRows = filteredRows.filter((row: any) => row.status === 'error');
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
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
            Valid <span className="text-green-500">&#10003;</span>
          </div>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg p-4 flex flex-col items-center border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{warnings}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            Warnings <span className="text-yellow-500">&#9888;</span>
          </div>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg p-4 flex flex-col items-center border border-red-200">
          <div className="text-2xl font-bold text-red-600">{errors}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            Errors <span className="text-red-500">&#10060;</span>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base">Shipment Data</span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded ml-2">
            CSV UPLOAD: BATCH_492.CSV
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === 'warning' ? 'default' : 'outline'}
            onClick={() => setFilter('warning')}
          >
            Warnings
          </Button>
          <Button
            size="sm"
            variant={filter === 'error' ? 'default' : 'outline'}
            onClick={() => setFilter('error')}
          >
            Errors
          </Button>
          <Button
            size="sm"
            variant={showErrorsOnly ? 'default' : 'outline'}
            onClick={() => setShowErrorsOnly((v) => !v)}
          >
            Show Errors Only
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white mb-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
              <th className="px-3 py-2 text-left font-semibold">Recipient</th>
              <th className="px-3 py-2 text-left font-semibold">
                Address Line 1
              </th>
              <th className="px-3 py-2 text-left font-semibold">City</th>
              <th className="px-3 py-2 text-left font-semibold">State</th>
              <th className="px-3 py-2 text-left font-semibold">ZIP</th>
              <th className="px-3 py-2 text-left font-semibold">Service</th>
              <th className="px-3 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row: any) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-2">
                  {row.status === 'valid' && (
                    <span className="inline-block w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">&#10003;</span>
                    </span>
                  )}
                  {row.status === 'warning' && (
                    <span className="inline-block w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-yellow-600">&#9888;</span>
                    </span>
                  )}
                  {row.status === 'error' && (
                    <span className="inline-block w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600">&#10060;</span>
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 font-medium">{row.recipient}</td>
                <td className="px-3 py-2">{row.address1}</td>
                <td className="px-3 py-2">{row.city}</td>
                <td className="px-3 py-2">{row.state}</td>
                <td
                  className={
                    'px-3 py-2 ' +
                    (row.status === 'error' ? 'text-red-600 font-bold' : '')
                  }
                >
                  {row.zip}
                </td>
                <td className="px-3 py-2">
                  <span className="bg-gray-100 rounded px-2 py-1 text-xs font-medium">
                    {row.service}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {row.action ? (
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      {row.action}
                    </a>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (demo, static) */}
      <div className="flex items-center justify-end mt-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={wizard.prevStep}
            className="cursor-pointer"
          >
            &#8592; Back to Mapping
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
            type="button"
            onClick={wizard.nextStep}
            disabled={valid === 0}
          >
            Process {valid} Shipments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2MapValidation;
