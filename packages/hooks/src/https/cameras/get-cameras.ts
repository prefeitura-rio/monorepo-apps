'use server'

import { api } from '@ed-rio/lib/api'
import type { Camera, RawCamera } from '@ed-rio/types/models'

export async function getCameras() {
  const response = await api.get<RawCamera[]>(
    'https://gw.dados.rio/civitas-staging/cameras-cor',
  )

  const cameras: Camera[] = response.data.map((camera) => ({
    id: camera.CameraCode,
    name: camera.CameraName,
    zone: camera.CameraZone,
    latitude: Number(camera.Latitude),
    longitude: Number(camera.Longitude),
    streamingUrl: camera.Streamming,
  }))

  return cameras
}
