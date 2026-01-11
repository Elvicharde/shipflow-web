import React, { createContext, useContext, useState } from 'react';
import { BulkShipment } from '../types/shipment';

interface BulkContextType {
  shipments: BulkShipment[];
  addShipment: (shipment: BulkShipment) => void;
  removeShipment: (id: string) => void;
  clearShipments: () => void;
}

const BulkContext = createContext<BulkContextType | undefined>(undefined);

export const BulkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<BulkShipment[]>([]);

  const addShipment = (shipment: BulkShipment) => {
    setShipments((prev) => [...prev, shipment]);
  };

  const removeShipment = (id: string) => {
    setShipments((prev) => prev.filter((shipment) => shipment.id !== id));
  };

  const clearShipments = () => {
    setShipments([]);
  };

  return (
    <BulkContext.Provider value={{ shipments, addShipment, removeShipment, clearShipments }}>
      {children}
    </BulkContext.Provider>
  );
};

export const useBulkContext = () => {
  const context = useContext(BulkContext);
  if (!context) {
    throw new Error('useBulkContext must be used within a BulkProvider');
  }
  return context;
};