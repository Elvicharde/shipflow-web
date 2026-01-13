import React from 'react';
import { PlusIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const EmptyShipments: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto my-25 max-h-78.5 max-w-lg px-6 py-0">
      <div className="flex max-w-88 flex-col items-center justify-between gap-y-6">
        <div className="flex flex-col items-center gap-y-4 text-center ">
          <img
            src="/icons/empty-item-alt.svg"
            alt="empty-item illustration"
            className="w-32 h-32"
          />
          <div className="flex flex-col items-center gap-y-6">
            <div>
              <p className="text-xl font-bold leading-6 tracking-[-2%] text-[#101828]">
                No Shipments Found
              </p>
              <p className="max-w-88 text-sm leading-[20.3px] text-[#475467]">
                Click “Upload CSV” to get started adding your first shipment.
              </p>
            </div>
          </div>
        </div>
        <div className="flex max-w-70 items-center justify-center  gap-x-3">
          <Link to="upload">
            <Button className="w-10 max-h-10 px-4 py-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              <PlusIcon className="size-6" />
              Upload CSV
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyShipments;
