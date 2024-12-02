'use server'

import { api } from '@ed-rio/lib/api'
import type { NotificationChannel } from '@ed-rio/types/models/notification-channel'

export async function getNotificationChannels() {
  const response = await api.get<NotificationChannel[]>(
    '/notification-channels',
  )

  return response.data
}
