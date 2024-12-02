'use client'

import { api } from '@ed-rio/lib/api'
import { useQuery } from '@tanstack/react-query'

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await api.get(
        `https://gw.dados.rio/vision-ai-staging/project/${id}`,
      )
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
