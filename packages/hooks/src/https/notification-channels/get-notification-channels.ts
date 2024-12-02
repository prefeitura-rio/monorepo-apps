'use server'

import { api } from '@ed-rio/lib/api'
import type { NotificationChannel } from '@ed-rio/types/models'

export async function getNotificationChannels() {
  const response = await api.get<NotificationChannel[]>(
    'https://gw.dados.rio/vision-ai-staging/notification-channels',
  )
  return response.data
}
