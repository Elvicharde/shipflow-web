/**
 * Central barrel file for all application types
 * Based on backend shipflow-api models
 */

import { ShipmentInput } from './shipment';

// Address types
export type {
  Address,
  SavedAddress,
  AddressInput,
  SavedAddressInput,
} from './address';

// Package types
export type {
  Package,
  SavedPackage,
  PackageInput,
  SavedPackageInput,
} from './package';

// Shipment types
export { ShipmentStatus, ValidationStatus, PricingStatus } from './shipment';
export type {
  Shipment,
  ShipmentInput,
  ShipmentUpdateInput,
  ValidationError,
  EditSenderData,
  EditRecipientData,
  EditPackageData,
  EditOthersData,
} from './shipment';

// Upload session types
export { UploadSessionStatus } from './upload';
export type {
  UploadSession,
  UploadResponse,
  SessionWithShipments,
  UploadResult,
} from './upload';