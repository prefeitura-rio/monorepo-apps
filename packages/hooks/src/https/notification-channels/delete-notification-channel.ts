'use server'

import { api } from '@ed-rio/lib/api'
import type { ApiResponseDetail } from '@ed-rio/types/models'

export async function deleteNotificationChannel(id: string) {
  const response = await api.delete<ApiResponseDetail>(
    `/notification-channels/${id}`,
  )

  return response.data
}
