import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Global error handler for mutations
 * Can be used to show toast notifications or handle common error scenarios
 */
export const handleMutationError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Mutation error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
};
