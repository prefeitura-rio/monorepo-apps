'use server'

import { api } from '@ed-rio/lib/api'
import type { Project } from '@ed-rio/types/models'

export async function getProjects() {
  const response = await api.get<Project[]>(
    'https://gw.dados.rio/vision-ai-staging/project',
  )
  return response.data
}
