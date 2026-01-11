import React, { useState } from 'react';
import { WizardHook } from '../../../hooks/useWizard';

interface Step3ShippingInformationProps {
  wizard: WizardHook;
}

const DEFAULT_COMPANIES = [
  { label: 'FedEx', value: 'FedEx' },
  { label: 'UPS', value: 'UPS' },
  { label: 'DHL', value: 'DHL' },
  { label: 'USPS', value: 'USPS' },
];

const Step3ShippingInformation: React.FC<Step3ShippingInformationProps> = ({
  wizard,
}) => {
  const validRows = wizard.csvData.filter((row: any) => row.status === 'valid');
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);
  const [selected, setSelected] = useState<{ [id: number]: string }>({});
  const [input, setInput] = useState<{ [id: number]: string }>({});

  const handleSelect = (id: number, value: string) => {
    setSelected((prev) => ({ ...prev, [id]: value }));
    setInput((prev) => ({ ...prev, [id]: '' }));
    if (!companies.find((c) => c.value.toLowerCase() === value.toLowerCase())) {
      setCompanies((prev) => [...prev, { label: value, value }]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Select Shipping Company</h2>
      <div className="mb-6 text-gray-500 text-sm">
        Assign a shipping company to each valid shipment. You can add a new
        company if it doesn't exist.
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white mb-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Recipient</th>
              <th className="px-3 py-2 text-left font-semibold">Address</th>
              <th className="px-3 py-2 text-left font-semibold">Service</th>
              <th className="px-3 py-2 text-left font-semibold">
                Shipping Company
              </th>
            </tr>
          </thead>
          <tbody>
            {validRows.map((row: any) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-2 font-medium">{row.recipient}</td>
                <td className="px-3 py-2">
                  {row.address1}, {row.city}, {row.state} {row.zip}
                </td>
                <td className="px-3 py-2">{row.service}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-col gap-1">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={selected[row.id] || ''}
                      onChange={(e) => handleSelect(row.id, e.target.value)}
                    >
                      <option value="" disabled>
                        Select company...
                      </option>
                      {companies.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-xs mt-1"
                      placeholder="Add new company..."
                      value={input[row.id] || ''}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          [row.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && input[row.id]?.trim()) {
                          handleSelect(row.id, input[row.id].trim());
                        }
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={wizard.prevStep}
          className="mr-2 px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
        <button
          onClick={wizard.nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3ShippingInformation;
