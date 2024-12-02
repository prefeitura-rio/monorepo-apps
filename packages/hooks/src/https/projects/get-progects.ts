'use server'

import { api } from '@ed-rio/lib/api'
import type { Project } from '@ed-rio/types/models'

export async function getProjects() {
  try {
    const response = await api.get<Project[]>('/vision-ai-staging/project')

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
