import { useQueries, useQuery } from '@tanstack/react-query';

/**
 * Hook to check if any query or mutation is in a loading state
 * Useful for showing global loading indicators or preventing user actions
 */
export const useIsLoading = (queryKeys?: string[]): boolean => {
  // This is a placeholder - in real usage you'd integrate with React Query's cache
  // For now, return false as queries manage their own loading states
  return false;
};

/**
 * Hook to get the error from the most recent failed query
 */
export const useLastError = (): Error | null => {
  // This can be extended to track errors across multiple queries
  return null;
};

/**
 * Combine multiple query/mutation statuses
 * Usage: const { isLoading, isError } = useCombinedStatus([query1, mutation1])
 */
export interface CombinedStatus {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const useCombinedStatus = (
  queries: Array<{
    isLoading?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
  }>,
): CombinedStatus => {
  return {
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    isSuccess: queries.every((q) => q.isSuccess),
  };
};
