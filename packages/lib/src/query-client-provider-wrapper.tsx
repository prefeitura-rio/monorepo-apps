'use client'

import { queryClient } from '@ed-rio/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
