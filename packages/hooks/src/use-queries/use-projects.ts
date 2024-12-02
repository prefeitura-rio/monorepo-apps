'use client'

import { useQuery } from '@tanstack/react-query'

import { getProjects } from '../https/projects/get-projects'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
