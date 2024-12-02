'use client'

import {
  FlyToInterpolator,
  type MapViewState,
  type PickingInfo,
} from '@deck.gl/core'
import {
  type UseAISPLayer,
  useAISPLayer,
} from '@ed-rio/hooks/use-map-layers/use-aisp-layer'
import {
  type UseBusStopLayer,
  useBusStopLayer,
} from '@ed-rio/hooks/use-map-layers/use-bus-stop-layer'
import {
  type UseCameraLayer,
  useCameraLayer,
} from '@ed-rio/hooks/use-map-layers/use-camera-layer'
import {
  type UseCISPLayer,
  useCISPLayer,
} from '@ed-rio/hooks/use-map-layers/use-cisp-layer'
import {
  type UseSchoolLayer,
  useSchoolLayer,
} from '@ed-rio/hooks/use-map-layers/use-school-layer'
import { MapStyle } from '@ed-rio/types/others/map-style'
import { createContext, useCallback, useState } from 'react'

const RIO_VIEWSTATE = {
  longitude: -43.47,
  latitude: -22.92957,
  zoom: 10.1,
}

interface VisionAIMapContextProps {
  layers: {
    cameras: UseCameraLayer
    AISP: UseAISPLayer
    CISP: UseCISPLayer
    schools: UseSchoolLayer
    busStops: UseBusStopLayer
  }
  viewState: MapViewState
  setViewState: (viewState: MapViewState) => void
  mapStyle: MapStyle
  setMapStyle: (style: MapStyle) => void
  flyTo: (destination: Partial<MapViewState>) => void
  openContextMenu: boolean
  setOpenContextMenu: (open: boolean) => void
  contextMenuPickingInfo: PickingInfo | null
  setContextMenuPickingInfo: (info: PickingInfo | null) => void
}

export const VisionAIMapContext = createContext({} as VisionAIMapContextProps)

export function VisionAIMapContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [viewState, setViewState] = useState<MapViewState>(RIO_VIEWSTATE)
  const [mapStyle, setMapStyle] = useState<MapStyle>(MapStyle.Map)
  const [openContextMenu, setOpenContextMenu] = useState(false)
  const [contextMenuPickingInfo, setContextMenuPickingInfo] =
    useState<PickingInfo | null>(null)

  const flyTo = useCallback((destination: Partial<MapViewState>) => {
    setViewState((currentViewState) => ({
      ...currentViewState,
      ...destination,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
    }))
  }, [])

  const cameras = useCameraLayer()
  const AISP = useAISPLayer()
  const CISP = useCISPLayer()
  const schools = useSchoolLayer()
  const busStops = useBusStopLayer()

  return (
    <VisionAIMapContext.Provider
      value={{
        layers: {
          cameras,
          AISP,
          CISP,
          schools,
          busStops,
        },
        viewState,
        setViewState,
        flyTo,
        mapStyle,
        setMapStyle,
        openContextMenu,
        setOpenContextMenu,
        contextMenuPickingInfo,
        setContextMenuPickingInfo,
      }}
    >
      {children}
    </VisionAIMapContext.Provider>
  )
}
