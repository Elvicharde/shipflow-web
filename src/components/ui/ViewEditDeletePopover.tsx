import * as React from 'react';
import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Button from '@/components/ui/Button';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { UploadResult } from '@/types';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogTrigger,
} from './alert-dialog';
import { Dialog, DialogTrigger } from './dialog';
import LoaderComponent from './LoaderComponent';
import ConfirmationComponent from './ConfirmationComponent';
import clsx from 'clsx';
import EditShipmentModal from './EditShipment/EditShipmentModal';

interface PopoverStyles {
  buttonStyles?: string;
  iconStyles?: string;
  dialogStyles?: string;
  toggleStyles?: string;
  ellipsisStyles?: string;
}

interface ViewEditDeletePopoverProps {
  data: UploadResult & { upload_session_id: string };
  styles?: PopoverStyles;
  onDelete: (row: UploadResult & { upload_session_id: string }) => void;
  disabled?: boolean;
  hideEdit?: boolean;
}

const ViewEditDeletePopover: React.FC<ViewEditDeletePopoverProps> = ({
  data,
  styles,
  onDelete,
  disabled = false,
  hideEdit = false,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete({
        ...data,
        upload_session_id: (data as any).upload_session_id ?? '',
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <>
      <Popover className="relative">
        <PopoverButton
          as={Button}
          className={clsx('h-8! w-8! rounded-lg!', styles?.toggleStyles)}
          variant="primary"
          disabled={disabled}
        >
          <EllipsisVerticalIcon
            className={clsx(styles?.ellipsisStyles, 'size-4 text-customGray')}
          />
        </PopoverButton>
        <PopoverPanel
          anchor="left"
          className={clsx(
            styles?.dialogStyles,
            'mt-8 -ml-1! max-h-37! w-fit min-w-40 max-w-53! rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm shadow-popover transition duration-200 ease-in-out',
          )}
        >
          {!hideEdit && (
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setIsEditOpen(true)}
                  className={clsx(
                    styles?.buttonStyles,
                    'max-h-9! max-w-45! justify-normal bg-white text-sm font-normal text-[#344054] hover:bg-[#F9FAFB]',
                  )}
                  variant="none"
                >
                  <img width={20} src="/icons/edit-icon.svg" alt="edit-icon" />
                  Edit
                </Button>
              </DialogTrigger>
              <EditShipmentModal
                shipment={data}
                upload_session_id={data.upload_session_id}
                refetch={
                  typeof (window as any).refetch === 'function'
                    ? (window as any).refetch
                    : undefined
                }
                onClose={() => setIsEditOpen(false)}
              />
            </Dialog>
          )}
          <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className={clsx(
                  styles?.buttonStyles,
                  'max-h-9! max-w-45! justify-normal! bg-white text-sm! font-normal hover:bg-[#F9FAFB] mt-1 text-[#D42620]',
                )}
                variant="none"
                onClick={() => setIsDeleteOpen(true)}
                disabled={isDeleting}
              >
                <img
                  width={20}
                  src="/icons/bin-icon-red.svg"
                  className="text-red-600"
                  alt="delete-icon"
                />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogOverlay>
              {isDeleting ? (
                <LoaderComponent
                  message="Deleting..."
                  ariaTitle="Deleting shipment"
                  ariaDesc="Please wait while the shipment is being deleted."
                />
              ) : (
                <ConfirmationComponent
                  message="Are you sure you want to delete this shipment?"
                  handleConfirm={handleDelete}
                  isDelete
                />
              )}
            </AlertDialogOverlay>
          </AlertDialog>
        </PopoverPanel>
      </Popover>
    </>
  );
};

export default ViewEditDeletePopover;
