import React from 'react';
import { useWizard } from '../../../hooks/useWizard';
import { ShipmentsTable } from '../../../components/ShipmentsTable';
import { ShipmentEditPanel } from '../../../components/ShipmentEditPanel';
import { LabelPreview } from '../../../components/LabelPreview';

const Step3PackageValidation: React.FC = () => {
    const { shipments, setSelectedShipmentId } = useWizard();

    return (
        <div>
            <h2>Package Validation</h2>
            <ShipmentsTable shipments={shipments} onRowSelect={setSelectedShipmentId} />
            <ShipmentEditPanel />
            <LabelPreview />
        </div>
    );
};

export default Step3PackageValidation;