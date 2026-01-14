import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 60000); // 1 minute
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full flex flex-col items-center">
        <div className="text-green-600 text-5xl mb-4">&#10003;</div>
        <h1 className="text-2xl font-bold mb-2">Shipment Request Completed</h1>
        <div className="text-gray-600 mb-4 text-center">
          Your shipment batch has been successfully submitted.
          <br />
          Label generation will begin shortly. You will be able to download your
          labels soon.
        </div>
        <Button
          className="bg-blue-600 text-white font-semibold px-6 py-2"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
        <div className="text-xs text-gray-400 mt-4">
          You will be redirected to the dashboard automatically in 1 minute.
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
