'use client'

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutos
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
      retry: false,
      retryOnMount: false,
    },
  },
})
