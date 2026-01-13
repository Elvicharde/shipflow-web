/**
 * UploadSession types based on backend models
 */

/**
 * Upload session status enum matching backend choices
 */
export enum UploadSessionStatus {
  UPLOADED = 'uploaded',
  VALIDATING = 'validating',
  VALIDATED = 'validated',
  PARTIAL_VALID = 'partial_valid',
  VALID = 'valid',
  INVALID = 'invalid',
  FAILED = 'failed',
  READY_FOR_PURCHASE = 'ready_for_purchase',
  PURCHASED = 'purchased',
}

/**
 * Complete UploadSession resource from API
 */
export interface UploadSession {
  id: string; // UUID
  filename?: string | null;
  status: UploadSessionStatus;
  rows_total?: number | null;
  rows_valid?: number | null;
  rows_invalid?: number | null;
  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

/**
 * Package details interface
 */
export interface PackageDetails {
  length_in: number | null;
  width_in: number | null;
  height_in: number | null;
  weight_lbs: number | null;
  weight_oz: number | null;
}

/**
 * Upload response from CSV upload endpoint
 */
export interface UploadResult {
  row: number;
  shipment_id: number;
  status: string;
  errors: Record<string, any>;
  price: number | null;
  currency: string;
  ship_from_address: string | null;
  ship_to_address: string | null;
  package_details: PackageDetails | null;
  order_number: string | null;
}

export interface UploadResponse {
  upload_session_id: string;
  total_rows: number;
  created: number;
  invalid: number;
  results: UploadResult[];
  errors: any[];
}

/**
 * Session with validation results
 * Used when fetching shipments from a session
 */
export interface SessionWithShipments {
  session: UploadSession;
  shipments: Array<{
    id: number;
    validation_status: string;
    validation_errors?: any;
    [key: string]: any;
  }>;
}
