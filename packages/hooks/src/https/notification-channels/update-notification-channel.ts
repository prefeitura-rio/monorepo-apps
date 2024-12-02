'use server'

import { api } from '@ed-rio/lib/api'
import type { NotificationChannel } from '@ed-rio/types/models'

export async function updateNotificationChannel(id: string, name: string) {
  const response = await api.put<NotificationChannel>(
    `/notification-channels/${id}`,
    {
      name,
    },
  )

  return response.data
}
