'use client'

import { VisionAIMapContext } from '@ed-rio/contexts/vision-ai-map-context'
import { layers as layersEnum } from '@ed-rio/hooks/use-map-layers/types'
import {
  ContextMenuLayer,
  LayerToggleMenuItem,
  Map as VisionAIMap,
} from '@ed-rio/ui/organisms/map'
import { BusFront, School, Shield, Video } from 'lucide-react'
import { useContext } from 'react'

interface MapProps {
  mapboxAccessToken: string
}

export default function Map({ mapboxAccessToken }: MapProps) {
  const {
    layers: {
      cameras: {
        layers: cameraLayer,
        onIconClick: selectCamera,
        isVisible: isCamerasVisible,
        setIsVisible: setIsCamerasVisible,
      },
      AISP: {
        layers: AISPLayer,
        isVisible: isAISPVisible,
        setIsVisible: setIsAISPVisible,
      },
      CISP: {
        layers: CISPLayer,
        isVisible: isCISPVisible,
        setIsVisible: setIsCISPVisible,
      },
      schools: {
        layers: schoolsLayer,
        isVisible: isSchoolsVisible,
        setIsVisible: setIsSchoolsVisible,
      },
      busStops: {
        layers: busStopsLayer,
        isVisible: isBusStopsVisible,
        setIsVisible: setIsBusStopsVisible,
      },
    },
    viewState,
    setViewState,
    mapStyle,
    contextMenuPickingInfo,
    openContextMenu,
    setContextMenuPickingInfo,
    setOpenContextMenu,
    setMapStyle,
    flyTo,
  } = useContext(VisionAIMapContext)

  const layers = [
    ...AISPLayer,
    ...CISPLayer,
    cameraLayer,
    schoolsLayer,
    busStopsLayer,
  ]

  const toggleMenuLayers: LayerToggleMenuItem[] = [
    {
      name: 'Câmeras',
      icon: <Video />,
      isVisible: isCamerasVisible,
      setIsVisible: setIsCamerasVisible,
    },
    {
      name: 'AISP',
      icon: <Shield />,
      isVisible: isAISPVisible,
      setIsVisible: (isVisible: boolean) => {
        setIsAISPVisible(isVisible)
        if (isVisible) setIsCISPVisible(false)
      },
    },
    {
      name: 'CISP',
      icon: <Shield />,
      isVisible: isCISPVisible,
      setIsVisible: (isVisible: boolean) => {
        setIsCISPVisible(isVisible)
        if (isVisible) setIsAISPVisible(false)
      },
    },
    {
      name: 'Escolas Municipais',
      icon: <School />,
      isVisible: isSchoolsVisible,
      setIsVisible: setIsSchoolsVisible,
    },
    {
      name: 'Paradas de Ônibus',
      icon: <BusFront />,
      isVisible: isBusStopsVisible,
      setIsVisible: setIsBusStopsVisible,
    },
  ]

  const contextMenuLayers: ContextMenuLayer[] = [
    {
      id: layersEnum.cameras,
      component: () => <div>Camera Context Menu</div>,
    },
  ]

  return (
    <div className="h-full w-full">
      <VisionAIMap
        mapboxAccessToken={mapboxAccessToken}
        contextMenuPickingInfo={contextMenuPickingInfo}
        openContextMenu={openContextMenu}
        setContextMenuPickingInfo={setContextMenuPickingInfo}
        setOpenContextMenu={setOpenContextMenu}
        setViewState={setViewState}
        viewState={viewState}
        mapStyle={mapStyle}
        layers={layers}
        flyTo={flyTo}
        selectableLayers={[{ id: 'cameras', onSelect: selectCamera }]}
        setMapStyle={setMapStyle}
        contextMenuLayers={contextMenuLayers}
        toggleMenuLayers={toggleMenuLayers}
      />
    </div>
  )
}
