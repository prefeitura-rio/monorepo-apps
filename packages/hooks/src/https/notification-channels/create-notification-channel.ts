'use server'

import { api } from '@ed-rio/lib/api'
import type { NotificationChannel } from '@ed-rio/types/models'

export async function createNotificationChannel(name: string) {
  const response = await api.post<NotificationChannel>(
    'https://gw.dados.rio/vision-ai-staging/notification-channels',
    {
      name,
    },
  )

  return response.data
}
