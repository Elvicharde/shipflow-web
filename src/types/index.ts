// This file defines the TypeScript types used throughout the Shipflow application.

export interface Shipment {
    id: string;
    address: Address;
    package: Package;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface Package {
    weight: number;
    dimensions: Dimensions;
    type: string;
}

export interface Dimensions {
    length: number;
    width: number;
    height: number;
}

export interface UploadSession {
    id: string;
    fileName: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    shipments: Shipment[];
}