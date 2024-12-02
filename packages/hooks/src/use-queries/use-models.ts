'use client'

import { useQuery } from '@tanstack/react-query'

import { getModels } from '../https/models/get-models'

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: async () => getModels(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
