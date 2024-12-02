'use client'

import { api } from '@ed-rio/lib/api'
import { Model } from '@ed-rio/types/models/model'
import { useQuery } from '@tanstack/react-query'

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await api.get<Model[]>(
        'https://gw.dados.rio/vision-ai-staging/model',
      )
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
