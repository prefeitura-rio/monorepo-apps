export type Camera = {
  id: string
  name: string
  zone: string
  latitude: number
  longitude: number
  streamingUrl: string
}

export type RawCamera = {
  CameraCode: string
  CameraName: string
  CameraZone: string
  Latitude: string
  Longitude: string
  Streamming: string
}
