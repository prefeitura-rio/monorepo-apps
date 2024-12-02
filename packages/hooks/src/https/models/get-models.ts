'use server'

import { api } from '@ed-rio/lib/api'
import type { Model } from '@ed-rio/types/models'

export async function getModels() {
  const response = await api.get<Model[]>(
    'https://gw.dados.rio/vision-ai-staging/model',
  )
  return response.data
}
