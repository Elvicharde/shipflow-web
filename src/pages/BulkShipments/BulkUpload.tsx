import React, { useState } from 'react';
import { useUpload } from '../../hooks/useApi';
import { BulkUploadForm } from '../../components/BulkUploadForm';
import { UploadConfirmationPage } from './UploadConfirmationPage';

const BulkUpload: React.FC = () => {
    const [isUploaded, setIsUploaded] = useState(false);
    const { uploadCSV } = useUpload();

    const handleUpload = async (file: File) => {
        try {
            await uploadCSV(file);
            setIsUploaded(true);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            {isUploaded ? (
                <UploadConfirmationPage />
            ) : (
                <BulkUploadForm onUpload={handleUpload} />
            )}
        </div>
    );
};

export default BulkUpload;