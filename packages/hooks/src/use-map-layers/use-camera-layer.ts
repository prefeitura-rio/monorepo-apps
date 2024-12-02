'use client'

import type { LayersList } from '@deck.gl/core'
import { IconLayer } from '@deck.gl/layers'
import { type Camera } from '@ed-rio/types/models/camera'
import { useMemo, useState } from 'react'

import cameraIconAtlas from '../assets/camera-icon-atlas.png'
import { useCameras } from '../use-queries/use-cameras'

export interface UseCameraLayer {
  id: string
  cameras: Camera[] | undefined
  selectedCameras: Camera[]
  setSelectedCameras: (selectedCameras: Camera[]) => void
  layers: LayersList
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  onIconClick: (camera: Camera) => void
}
export function useCameraLayer(): UseCameraLayer {
  const id = 'cameras'
  const [selectedCameras, setSelectedCameras] = useState<Camera[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const { data: cameras } = useCameras()

  function onIconClick(camera: Camera) {
    const selectedObject = selectedCameras.find((c) => c.id === camera.id)
    if (selectedObject) {
      setSelectedCameras((prev) => prev.filter((c) => c.id !== camera.id))
    } else {
      setSelectedCameras((prev) => [...prev, camera])
    }
  }

  const baseLayer = useMemo(
    () =>
      new IconLayer<Camera>({
        id,
        data: cameras,
        pickable: true,
        getSize: 24,
        autoHighlight: true,
        highlightColor: [7, 76, 128, 250], // CIVITAS-dark-blue
        visible: isVisible,
        iconAtlas: cameraIconAtlas.src,
        iconMapping: {
          default: {
            x: 0,
            y: 0,
            width: 48,
            height: 48,
            mask: false,
          },
          highlighted: {
            x: 48,
            y: 0,
            width: 48,
            height: 48,
            mask: false,
          },
        },
        getIcon: (d) => {
          if (selectedCameras.find((c) => c.id === d.id)) {
            return 'highlighted'
          }

          return 'default'
        },
        // getIcon: () => ({
        //   url: busFront.src,
        //   width: 48,
        //   height: 48,
        //   mask: false,
        // }),
        getPosition: (d) => [d.longitude, d.latitude],
      }),

    [cameras, isVisible, selectedCameras],
  )

  return {
    id,
    cameras,
    selectedCameras,
    setSelectedCameras,
    layers: [baseLayer],
    isVisible,
    setIsVisible,
    onIconClick,
  }
}
