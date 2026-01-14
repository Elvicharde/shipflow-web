/**
 * Package and SavedPackage types based on backend models
 */

export interface Package {
  id: number;
  sku?: string | null;

  // Dimensions in inches
  length_in?: number | null;
  width_in?: number | null;
  height_in?: number | null;

  // Weight: pounds + ounces (oz < 16)
  weight_lbs?: number | null;
  weight_oz?: number | null;

  // Timestamps
  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

export interface SavedPackage {
  id: number;
  label: string;
  package: Package;
  is_default: boolean;
  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

/**
 * Form input for creating/updating packages
 */
export interface PackageInput {
  sku?: string;
  length_in?: number;
  width_in?: number;
  height_in?: number;
  weight_lbs?: number;
  weight_oz?: number;
}

/**
 * Form input for creating/updating saved packages
 */
export interface SavedPackageInput {
  label: string;
  package: PackageInput;
  is_default?: boolean;
}
