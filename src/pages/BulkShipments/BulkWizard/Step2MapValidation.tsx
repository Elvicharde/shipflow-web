import React from 'react';
import { useBulk } from '../../../hooks/useBulk';
import { MapViewer } from '../../../components/Map/MapViewer';
import { GeocodingSearch } from '../../../components/Map/GeocodingSearch';
import { Button } from '../../../components/ui/Button';

const Step2MapValidation: React.FC = () => {
    const { bulkData, updateBulkData } = useBulk();

    const handleLocationSelect = (location: any) => {
        // Update the bulk data with the selected location
        updateBulkData(location);
    };

    return (
        <div className="step2-map-validation">
            <h2>Map Validation</h2>
            <GeocodingSearch onSelect={handleLocationSelect} />
            <MapViewer locations={bulkData.locations} />
            <Button onClick={() => console.log('Proceed to next step')}>Next</Button>
        </div>
    );
};

export default Step2MapValidation;