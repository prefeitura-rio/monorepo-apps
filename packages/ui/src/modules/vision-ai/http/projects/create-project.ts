'use server'

import { api } from '@ed-rio/lib/api'
import type { Project } from '@ed-rio/types/models/project'

export interface CreateProjectProps {
  name: string
  model: string
  model_config: {
    yolo_crowd_count?: number // CROWD
    yolo_default_precision?: number
    yolo_discord_webhook_id?: string
    yolo_discord_webhook_token?: string
    yolo_send_message?: boolean
  }
  cameras_id: string[]
  time_start?: string
  time_end?: string
  discord_id: string
}

export async function createProject(props: CreateProjectProps) {
  const response = await api.post<Project>(
    'https://gw.dados.rio/vision-ai-staging/project',
    props,
  )

  return response.data
}
