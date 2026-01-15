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

export type EditSection = 'sender' | 'recipient' | 'package' | 'others';

interface EditShipmentModalProps {
  open: boolean;
  onClose: () => void;
  shipment: UploadResult;
  upload_session_id: string;
  refetch?: () => void;
}

const EditShipmentModal: React.FC<EditShipmentModalProps> = ({
  open,
  onClose,
  shipment,
  upload_session_id,
  refetch,
}) => {
  const [activeSection, setActiveSection] = useState<EditSection | null>(null);
  const slug = shipment?.shipment_id || '';

  return (
    <DialogContent
      className="sm:max-w-163 overflow-y-auto"
      open={open}
      onClose={onClose}
    >
      <DialogHeader>
        <DialogTitle>Edit Shipment</DialogTitle>
        <DialogDescription>
          What section of this shipment would you like to update?
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-x-4.5 gap-y-8 sm:grid-cols-2">
        <div
          onClick={() => setActiveSection('sender')}
          className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
        >
          <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
            <img src="/assets/icons/info-blue.svg" alt="" className="w-5 h-5" />
          </Badge>
          <p className="text-deep-grey leading-default text-sm">
            Sender Information
          </p>
        </div>

        <div
          onClick={() => setActiveSection('recipient')}
          className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
        >
          <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
            <img
              src="/assets/icons/image-blue.svg"
              alt=""
              className="w-5 h-5"
            />
          </Badge>
          <p className="text-deep-grey leading-default text-sm">
            Recipient Information
          </p>
        </div>

        <div
          onClick={() => setActiveSection('package')}
          className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
        >
          <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
            <img
              src="/assets/icons/active-inventory.svg"
              alt=""
              className="w-5 h-5"
            />
          </Badge>
          <p className="text-deep-grey leading-default text-sm">
            Package Details
          </p>
        </div>

        <div
          onClick={() => setActiveSection('others')}
          className="border cursor-pointer flex items-center gap-4 border-[#E4E7EC] rounded-[10px] p-4"
        >
          <Badge className="w-8 h-8 rounded-lg border-[#C6DDF7] border bg-[#E3EFFC]">
            <img
              src="/assets/icons/active-dollar.svg"
              alt=""
              className="w-5 h-5"
            />
          </Badge>
          <p className="text-deep-grey leading-default text-sm">Other Info</p>
        </div>
      </div>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>

      {/* Render the selected section form below */}
      <div className="mt-8">
        {activeSection === 'sender' && (
          <EditSenderForm
            sessionId={String(upload_session_id)}
            shipmentId={shipment.shipment_id}
            onClose={onClose}
            refetch={refetch}
          />
        )}
        {activeSection === 'recipient' && (
          <EditRecipientForm
            sessionId={String(upload_session_id)}
            shipmentId={shipment.shipment_id}
            onClose={onClose}
            refetch={refetch}
          />
        )}
        {activeSection === 'package' && (
          <EditPackageForm
            sessionId={String(upload_session_id)}
            shipmentId={shipment.shipment_id}
            onClose={onClose}
            refetch={refetch}
          />
        )}
        {activeSection === 'others' && (
          <EditOthersForm
            sessionId={String(upload_session_id)}
            shipmentId={shipment.shipment_id}
            onClose={onClose}
            refetch={refetch}
          />
        )}
        <Button className="w-full mt-4" variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </DialogContent>
  );
};

export default EditShipmentModal;
