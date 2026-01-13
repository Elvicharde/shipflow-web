import React, { useState } from 'react';
import Button from '../Button';
import EditSenderForm from './EditSenderForm';
import EditRecipientForm from './EditRecipientForm';
import EditPackageForm from './EditPackageForm';
import EditOthersForm from './EditOthersForm';
import { UploadResult } from '@/types';

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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'hidden'}`}
    >
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-xl z-10">
        <h2 className="text-lg font-semibold mb-4">Edit Shipment</h2>
        <div className="flex gap-4 mb-6">
          <Button
            className="flex-1"
            variant={activeSection === 'sender' ? 'primary' : 'outline'}
            onClick={() => setActiveSection('sender')}
          >
            Sender
          </Button>
          <Button
            className="flex-1"
            variant={activeSection === 'recipient' ? 'primary' : 'outline'}
            onClick={() => setActiveSection('recipient')}
          >
            Recipient
          </Button>
          <Button
            className="flex-1"
            variant={activeSection === 'package' ? 'primary' : 'outline'}
            onClick={() => setActiveSection('package')}
          >
            Package
          </Button>
          <Button
            className="flex-1"
            variant={activeSection === 'others' ? 'primary' : 'outline'}
            onClick={() => setActiveSection('others')}
          >
            Others
          </Button>
        </div>
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
    </div>
  );
};

export default EditShipmentModal;
