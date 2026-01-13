// Interfaces for edit form data shapes
export interface EditSenderData extends Partial<ShipmentInput['ship_from']> {}
export interface EditRecipientData extends Partial<ShipmentInput['ship_to']> {}
export interface EditPackageData extends Partial<ShipmentInput['package']> {}
export interface EditOthersData {
  order_number?: string;
}
/**
 * Shipment types based on backend models
 */

import { Address } from './address';
import { Package } from './package';

/**
 * Shipment status enum matching backend choices
 */
export enum ShipmentStatus {
  CREATED = 'created',
  VALIDATED = 'validated',
  PARTIAL_VALID = 'partial_valid',
  INVALID = 'invalid',
  READY_FOR_PURCHASE = 'ready_for_purchase',
  PURCHASED = 'purchased',
  CANCELLED = 'cancelled',
}

/**
 * Validation status enum matching backend choices
 */
export enum ValidationStatus {
  VALID = 'valid',
  PARTIAL = 'partial',
  INVALID = 'invalid',
  BLANK = 'blank',
}

/**
 * Pricing status enum matching backend choices
 */
export enum PricingStatus {
  PRICED = 'priced',
  UNPRICED = 'unpriced',
  ERROR = 'error',
}

/**
 * Shipment validation error structure
 */
export interface ValidationError {
  field?: string;
  message: string;
  code?: string;
}

/**
 * Complete Shipment resource from API
 */
export interface Shipment {
  id: number;
  upload_session: string | number; // UUID or ID
  ship_from: Address;
  ship_to: Address;
  package: Package;

  shipping_service?: string | null;
  price_cents?: number | null;
  order_number?: string | null;

  status: ShipmentStatus;
  validation_status: ValidationStatus;
  validation_errors?: ValidationError[] | Record<string, any> | null;
  pricing_status: PricingStatus;
  locked: boolean;

  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

/**
 * Form input for creating/updating shipments
 * Only includes writable fields
 */
export interface ShipmentInput {
  upload_session: string | number;
  ship_from: {
    name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    phone?: string;
  };
  ship_to: {
    name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    phone?: string;
  };
  package: {
    sku?: string;
    length_in?: number;
    width_in?: number;
    height_in?: number;
    weight_lbs?: number;
    weight_oz?: number;
  };
  shipping_service?: string;
  order_number?: string;
}

/**
 * Shipment update payload (partial fields)
 * Used for PATCH requests
 */
export interface ShipmentUpdateInput {
  shipping_service?: string;
  order_number?: string;
  ship_from?: Partial<ShipmentInput['ship_from']>;
  ship_to?: Partial<ShipmentInput['ship_to']>;
  package?: Partial<ShipmentInput['package']>;
}
