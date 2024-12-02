'use client'

import { useQuery } from '@tanstack/react-query'

import { getCameras } from '../https/cameras/get-cameras'

export function useCameras() {
  return useQuery({
    queryKey: ['cameras'],
    queryFn: () => getCameras(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
