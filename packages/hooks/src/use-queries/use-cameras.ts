'use client'

import { api } from '@ed-rio/lib/api'
import { useQuery } from '@tanstack/react-query'

type RawCamera = {
  CameraCode: string
  CameraName: string
  CameraZone: string
  Latitude: number
  Longitude: number
  Streamming: string
}

export type Camera = {
  id: string
  name: string
  zone: string
  latitude: number
  longitude: number
  streamingUrl: string
}

export function useCameras() {
  return useQuery({
    queryKey: ['cameras'],
    queryFn: async () => {
      const response = await api.get<RawCamera[]>(
        'https://gw.dados.rio/civitas-staging/cameras',
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
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
