import { useAppStore } from '@/app/store';
import { UploadResponse, UploadResult } from '@/types';
import { useGetUploadedShipments } from '@/app/api/upload-api';
import { DataTable } from '@/components/ui/DataTable';
import ViewEditDeletePopover from '@/components/ui/ViewEditDeletePopover';
import { useDeleteShipment } from '@/app/api/shipments-api';
import { useEffect, useState } from 'react';
import { WizardHook } from '@/hooks/useWizard';
import Button from '@/components/ui/Button';

interface Step3ShippingInformationProps {
  wizard: WizardHook;
}

const Step3ShippingInformation: React.FC<Step3ShippingInformationProps> = ({
  wizard,
}) => {
  const uploadResponse: UploadResponse | null = useAppStore(
    (s) => s.uploadResponse,
  );
  const sessionId = uploadResponse?.upload_session_id || null;
  const { data: sessionShipments } = useGetUploadedShipments(
    sessionId as string,
  );
  const results: UploadResult[] =
    sessionShipments?.results || uploadResponse?.results || [];
  const [tableResults, setTableResults] = useState<UploadResult[]>([]);
  // Sync tableResults with validResults from API
  useEffect(() => {
    setTableResults(results.filter((row) => row.status === 'valid'));
  }, [results]);

  // Dropdown state for each shipment
  const [selectedService, setSelectedService] = useState<
    Record<number, string>
  >({});
  const [selectedOption, setSelectedOption] = useState<Record<number, string>>(
    {},
  );

  const shippingServices = [
    { value: 'UPS', label: 'UPS' },
    { value: 'FedEx', label: 'FedEx' },
    { value: 'DHL', label: 'DHL' },
    { value: 'USPS', label: 'USPS' },
  ];
  const shippingOptions = [
    { value: 'priority', label: 'Priority Mail' },
    { value: 'ground', label: 'Ground Shipping' },
  ];

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

  const columns = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: any) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 32,
    },
    {
      accessorKey: 'ship_from_address',
      header: 'Ship From Address',
      size: 160,
      cell: ({ row }: any) => (
        <div
          className="w-44 truncate"
          title={row.original.ship_from_address || ''}
        >
          {row.original.ship_from_address || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'ship_to_address',
      header: 'Ship To Address',
      size: 160,
      cell: ({ row }: any) => (
        <div
          className="w-44 truncate"
          title={row.original.ship_to_address || ''}
        >
          {row.original.ship_to_address || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'package_details',
      header: 'Package Details',
      size: 180,
      cell: ({ row }: any) => {
        const pkg = row.original.package_details;
        if (!pkg) return '-';
        const { length_in, width_in, height_in, weight_lbs, weight_oz } = pkg;
        return `${length_in ?? '-'}x${width_in ?? '-'}x${height_in ?? '-'} in, ${weight_lbs ?? '-'} lbs ${weight_oz ?? 0} oz`;
      },
    },
    {
      accessorKey: 'order_number',
      header: 'Order No',
      size: 120,
      cell: ({ row }: any) => row.original.order_number || '-',
    },
    {
      id: 'shipping_service',
      header: 'Shipping Service',
      size: 180,
      cell: ({ row }: any) => {
        const shipmentId = row.original.shipment_id;
        const selected =
          selectedService[shipmentId] || shippingServices[0].value;
        return (
          <select
            value={selected}
            onChange={(e) =>
              setSelectedService((prev) => ({
                ...prev,
                [shipmentId]: e.target.value,
              }))
            }
            className="border rounded px-2 py-1 text-sm"
          >
            {shippingServices.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      id: 'shipping_option',
      header: 'Shipping Option',
      size: 180,
      cell: ({ row }: any) => {
        const shipmentId = row.original.shipment_id;
        const selected = selectedOption[shipmentId] || shippingOptions[0].value;
        return (
          <select
            value={selected}
            onChange={(e) =>
              setSelectedOption((prev) => ({
                ...prev,
                [shipmentId]: e.target.value,
              }))
            }
            className="border rounded px-2 py-1 text-sm"
          >
            {shippingOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      id: 'actions',
      header: 'Action',
      size: 80,
      cell: ({ row }: any) => (
        <ViewEditDeletePopover
          data={{ ...row.original, upload_session_id: sessionId || '' }}
          onDelete={() => handleDelete(row.original)}
          styles={{ buttonStyles: 'text-red-600' }}
          hideEdit={true}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <div className="max-w-full mx-auto">
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={tableResults} />
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="outline"
          className="h-9 px-4"
          onClick={() => wizard.prevStep()}
        >
          Back
        </Button>
        <Button
          className="h-9 px-4"
          onClick={() => wizard.nextStep()}
          disabled={tableResults.length === 0}
        >
          Review
        </Button>
      </div>
    </div>
  );
};

export default Step3ShippingInformation;
