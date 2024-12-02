'use client'

import { useQuery } from '@tanstack/react-query'

import { getProject } from '../https/projects/get-project'

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
