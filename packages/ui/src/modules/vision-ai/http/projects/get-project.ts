'use server'

import { api } from '@ed-rio/lib/api'
import type { Project } from '@ed-rio/types/models/project'

export async function getProject(id: string) {
  const response = await api.get<Project>(
    `https://gw.dados.rio/vision-ai-staging/project/${id}`,
  )
  return response.data
}
