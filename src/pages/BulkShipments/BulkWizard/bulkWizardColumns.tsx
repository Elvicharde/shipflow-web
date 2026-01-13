import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import ViewEditDeletePopover from '../../../components/ui/ViewEditDeletePopover';
import { Checkbox } from '@/components/ui/Checkbox';
import { UploadResult } from '@/types';

export const getBulkWizardColumns = (
  onEdit: (row: UploadResult) => void,
  onDelete: (row: UploadResult) => void,
  upload_session_id: string,
): ColumnDef<UploadResult>[] => [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    accessorKey: 'ship_from_address',
    header: 'Ship From Address',
    size: 320,
    cell: ({ row }) => {
      const addr = row.original.ship_from_address;
      return (
        <div className="w-80 truncate" title={addr || ''}>
          {addr || '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'ship_to_address',
    header: 'Ship To Address',
    size: 320,
    cell: ({ row }) => {
      const addr = row.original.ship_to_address;
      return (
        <div className="w-80 truncate" title={addr || ''}>
          {addr || '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'package_details',
    header: 'Package Details',
    size: 180,
    cell: ({ row }) => {
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
    cell: ({ row }) => row.original.order_number || '-',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    cell: ({ row }) => {
      const status = row.original.status;
      return status === 'valid' ? (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-700 border-green-200"
        >
          Valid
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-red-100 text-red-700 border-red-200"
        >
          Invalid
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Action',
    size: 80,
    cell: ({ row }) => {
      return (
        <div className="px-2 py-1.5">
          <ViewEditDeletePopover
            data={{ ...row.original, upload_session_id }}
            onDelete={() => onDelete(row.original)}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
