'use server'

import { api } from '@ed-rio/lib/api'
import type { NotificationChannel } from '@ed-rio/types/models/notification-channel'

export async function createNotificationChannel(name: string) {
  const response = await api.post<NotificationChannel>(
    '/notification-channels',
    {
      name,
    },
  )

  return response.data
}
