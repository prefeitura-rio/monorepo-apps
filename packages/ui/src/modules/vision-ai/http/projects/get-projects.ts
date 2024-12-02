'use server'

import { api } from '@ed-rio/lib/api'
import type { Project } from '@ed-rio/types/models/project'

export async function getProjects() {
  const response = await api.get<Project[]>('/project')

  return response.data
}
