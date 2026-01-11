import React from 'react';
import { useForm } from 'react-hook-form';
import { useBulk } from '../../../hooks/useBulk';
import { UploadFile } from '../../../types/upload';
import { Button } from '../../../components/ui/Button';

const Step1Upload: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UploadFile>();
    const { uploadFile } = useBulk();

    const onSubmit = async (data: UploadFile) => {
        await uploadFile(data);
    };

    return (
        <div className="step-upload">
            <h2>Upload CSV File</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="file"
                        accept=".csv"
                        {...register('file', { required: 'File is required' })}
                    />
                    {errors.file && <span>{errors.file.message}</span>}
                </div>
                <Button type="submit">Upload</Button>
            </form>
        </div>
    );
};

export default Step1Upload;