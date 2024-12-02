export type Project = {
  id: string
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
  time_start: string | null
  time_end: string | null
  discord_id: string
  enable: true
}
