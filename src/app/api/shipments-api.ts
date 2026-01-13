// Generic fetch for a single shipment by session and shipment id
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post, del } from './http';
import { queryClient } from './queryClient';
import type { Shipment, ShipmentUpdateInput } from '../../types';

/**
 * Fetch a single shipment by session and shipment id, with optional fractional data.
 * @param sessionId - The upload session id
 * @param shipmentId - The shipment id
 * @param fields - Optional: 'ship_from', 'ship_to', or 'package' to fetch only that part
 * @param params - Additional query params
 */
export function useGetShipmentBySession<T = Shipment>({
  sessionId,
  shipmentId,
  fields,
  params = {},
}: {
  sessionId: string;
  shipmentId: string | number;
  fields?: 'ship_from' | 'ship_to' | 'package';
  params?: Record<string, any>;
}) {
  // Build query string
  const searchParams = new URLSearchParams({
    shipment_id: String(shipmentId),
    ...(fields ? { fields } : {}),
    ...params,
  }).toString();
  const url = `/shipments/${sessionId}/by-session/?${searchParams}`;
  return useQuery<T>({
    queryKey: ['shipment-by-session', sessionId, shipmentId, fields, params],
    queryFn: () => get<T>(url),
    enabled: !!sessionId && !!shipmentId,
  });
}

export const useGetSessionShipments = (sessionId: string | null) =>
  useQuery<Shipment[]>({
    queryKey: ['session-shipments', sessionId],
    queryFn: () => get<Shipment[]>(`/uploads/${sessionId}/shipments/`),
    enabled: !!sessionId,
  });

export const useGetShipment = (id: string | number | undefined) =>
  useQuery<Shipment>({
    queryKey: ['shipment', id],
    queryFn: () => get<Shipment>(`/shipments/${id}/`),
    enabled: !!id,
  });

export const usePatchShipment = (id: string | number) =>
  useMutation<Shipment, Error, ShipmentUpdateInput>({
    mutationFn: (body) => patch<Shipment>(`/shipments/${id}/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipment', id] });
      queryClient.invalidateQueries({ queryKey: ['session-shipments'] });
    },
  });

export const usePurchase = (sessionId: string) =>
  useMutation<{ success: boolean; message?: string }, Error>({
    mutationFn: () => post(`/uploads/${sessionId}/purchase/`),
  });

export const useDeleteShipment = () =>
  useMutation<void, Error, number>({
    mutationFn: (shipment_id) =>
      post<void>(`/shipments/delete-shipment/`, { shipment_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['session-shipments', 'uploaded-shipments'],
      });
    },
  });
