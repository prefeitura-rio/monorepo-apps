'use client'

import { api } from '@ed-rio/lib/api'
import type { NotificationChannel } from '@ed-rio/types/models'
import { useQuery } from '@tanstack/react-query'

export function useNotificationChannels() {
  return useQuery({
    queryKey: ['notification-channels'],
    queryFn: async () => {
      const response = await api.get<NotificationChannel[]>(
        'https://gw.dados.rio/vision-ai-staging/model',
      )
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
