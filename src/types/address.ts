/**
 * Address and SavedAddress types based on backend models
 */

export interface Address {
  id: number;
  name: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state?: string | null;
  postal_code: string;
  phone?: string | null;

  // Verification fields
  is_verified: boolean;
  verification_provider?: string | null;
  verified_at?: string | null; // ISO 8601 datetime
  verification_metadata?: Record<string, any> | null;

  // Timestamps
  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

export interface SavedAddress {
  id: number;
  label: string;
  address: Address;
  is_default: boolean;
  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

/**
 * Form input for creating/updating addresses (frontend sends this to API)
 */
export interface AddressInput {
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  phone?: string;
}

/**
 * Form input for creating/updating saved addresses
 */
export interface SavedAddressInput {
  label: string;
  address: AddressInput;
  is_default?: boolean;
}
