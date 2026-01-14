import { Shipment } from '../types/shipment';

export const validateShipmentData = (shipment: Shipment): string[] => {
  const errors: string[] = [];

  if (!shipment.ship_to && !shipment.ship_from) {
    errors.push('Address is required.');
  }

  if (!shipment.package) {
    errors.push('Package information is required.');
  }

  if (shipment.package && (shipment.package.weight_lbs ?? 0) <= 0) {
    errors.push('Weight must be greater than zero.');
  }

  if (!shipment.ship_to) {
    errors.push('Destination is required.');
  }

  return errors;
};

export const validateBulkShipments = (shipments: Shipment[]): string[] => {
  const allErrors: string[] = [];

  shipments.forEach((shipment, index) => {
    const errors = validateShipmentData(shipment);
    if (errors.length > 0) {
      allErrors.push(`Shipment ${index + 1}: ${errors.join(', ')}`);
    }
  });

  return allErrors;
};
