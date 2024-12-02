'use client'

import { useQuery } from '@tanstack/react-query'

import { getNotificationChannels } from '../https/notification-channels/get-notification-channels'

export function useNotificationChannels() {
  return useQuery({
    queryKey: ['notification-channels'],
    queryFn: () => getNotificationChannels(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
