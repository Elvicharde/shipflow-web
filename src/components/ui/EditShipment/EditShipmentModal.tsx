import React, { useState } from 'react';
import Button from '../Button';
import EditSenderForm from './EditSenderForm';
import EditRecipientForm from './EditRecipientForm';
import EditPackageForm from './EditPackageForm';
import EditOthersForm from './EditOthersForm';
import { UploadResult } from '@/types';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { set } from 'zod';

export type EditSection = 'sender' | 'recipient' | 'package' | 'others';

interface EditShipmentModalProps {
  shipment: UploadResult;
  upload_session_id: string;
  refetch?: () => void;
  action: EditSection | null;
  setAction: (a: EditSection | null) => void;
  setModalOpen: (open: boolean) => void;
}

const EditShipmentModal: React.FC<EditShipmentModalProps> = ({
  shipment,
  upload_session_id,
  refetch,
  action,
  setAction,
  setModalOpen,
}) => {
  const slug = shipment?.shipment_id || '';

  const handleClose = () => {
    if (action !== null) {
      setAction(null);
    } else {
      setAction(null);
      setModalOpen(false);
    }
  };

  return (
    <DialogContent
      className="sm:max-w-163 overflow-y-auto p-8!"
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
    >
      {action === null ? (
        <>
          <DialogHeader>
            <DialogTitle>Edit Shipment</DialogTitle>
            <DialogDescription className="mt-2 mb-6 text-sm text-dark-grey">
              What section of this shipment would you like to update?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-x-4.5 gap-y-8 sm:grid-cols-2">
            <div
              onClick={() => setAction('sender')}
              className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
            >
              <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
                <img
                  src="/icons/active-vendors.svg"
                  alt=""
                  className="w-5 h-5"
                />
              </Badge>
              <p className="text-deep-grey leading-default text-sm">
                Sender Information
              </p>
            </div>

            <div
              onClick={() => setAction('recipient')}
              className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
            >
              <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
                <img
                  src="/icons/active-client-icon.svg"
                  alt=""
                  className="w-5 h-5"
                />
              </Badge>
              <p className="text-deep-grey leading-default text-sm">
                Recipient Information
              </p>
            </div>

            <div
              onClick={() => setAction('package')}
              className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
            >
              <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
                <img
                  src="/icons/active-inventory.svg"
                  alt=""
                  className="w-5 h-5"
                />
              </Badge>
              <p className="text-deep-grey leading-default text-sm">
                Package Details
              </p>
            </div>

            <div
              onClick={() => setAction('others')}
              className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
            >
              <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
                <img src="/icons/info-blue.svg" alt="" className="w-5 h-5" />
              </Badge>
              <p className="text-deep-grey leading-default text-sm">
                Other Info
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                className="mt-4 px-4 h-9!"
                variant="confirm"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </>
      ) : (
        <div className="mt-8">
          {action === 'sender' && (
            <EditSenderForm
              sessionId={String(upload_session_id)}
              shipmentId={shipment.shipment_id}
              onClose={handleClose}
              refetch={refetch}
            />
          )}
          {action === 'recipient' && (
            <EditRecipientForm
              sessionId={String(upload_session_id)}
              shipmentId={shipment.shipment_id}
              onClose={handleClose}
              refetch={refetch}
            />
          )}
          {action === 'package' && (
            <EditPackageForm
              sessionId={String(upload_session_id)}
              shipmentId={shipment.shipment_id}
              onClose={handleClose}
              refetch={refetch}
            />
          )}
          {action === 'others' && (
            <EditOthersForm
              sessionId={String(upload_session_id)}
              shipmentId={shipment.shipment_id}
              onClose={handleClose}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </DialogContent>
  );
};

export default EditShipmentModal;
