/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import type { LayersList, MapViewState, PickingInfo } from '@deck.gl/core'
import DeckGL, { type DeckGLRef } from '@deck.gl/react'
import type { MapStyle } from '@ed-rio/types/others/map-style'
import { type MouseEvent, useCallback, useRef } from 'react'
import { Map as MapGL, type MapRef } from 'react-map-gl'

import { ContextMenu } from './components/context-menu/index'
import { LayerToggleMenu } from './components/layer-toggle-menu/index'
import type { ContextMenuLayer, LayerToggleMenuItem } from './types'

export type { ContextMenuLayer, LayerToggleMenuItem } from './types'

interface MapProps {
  mapboxAccessToken: string
  layers: LayersList
  selectableLayers: {
    id: string
    onSelect: (object: any) => void
  }[]
  viewState: MapViewState
  setViewState: (viewState: MapViewState) => void
  mapStyle: MapStyle
  setMapStyle: (style: MapStyle) => void
  flyTo: (destination: Partial<MapViewState>) => void
  openContextMenu: boolean
  setOpenContextMenu: (open: boolean) => void
  contextMenuPickingInfo: PickingInfo | null
  setContextMenuPickingInfo: (info: PickingInfo | null) => void
  toggleMenuLayers: LayerToggleMenuItem[]
  contextMenuLayers: ContextMenuLayer[]
}

export function Map({
  mapboxAccessToken,
  mapStyle,
  setViewState,
  viewState,
  layers,
  openContextMenu,
  setOpenContextMenu,
  contextMenuPickingInfo,
  setContextMenuPickingInfo,
  selectableLayers,
  toggleMenuLayers,
  contextMenuLayers,
}: MapProps) {
  const deckRef = useRef<DeckGLRef | null>(null)
  const mapRef = useRef<MapRef | null>(null)

  function onRightClick(e: MouseEvent) {
    e.preventDefault()
    const y = e.clientY
    const x = e.clientX
    const info = deckRef.current?.pickObject({ x, y, radius: 0 })
    setContextMenuPickingInfo(info || null)
    setOpenContextMenu(!!info)
  }

  function onLeftClick(e: MouseEvent) {
    e.preventDefault()

    const y = e.clientY
    const x = e.clientX

    const info = deckRef.current?.pickObject({ x, y, radius: 0 })
    if (!info?.object) return

    const layer = selectableLayers.find((layer) => layer.id === info?.layer?.id)
    if (!layer) return

    layer.onSelect(info.object)
  }

  const onViewStateChange = useCallback(
    ({ viewState }: { viewState: any }) => {
      setViewState(viewState)
    },
    [setViewState],
  )

  return (
    <div
      className="h-full w-full relative"
      onContextMenu={onRightClick}
      onClick={onLeftClick}
    >
      <DeckGL
        ref={deckRef}
        initialViewState={viewState}
        controller={true}
        layers={layers}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        getCursor={({ isDragging, isHovering }) => {
          if (isDragging) return 'grabbing'
          if (isHovering) return 'pointer'
          return 'grab'
        }}
      >
        <MapGL
          ref={mapRef}
          mapStyle={mapStyle}
          mapboxAccessToken={mapboxAccessToken}
        />
        <LayerToggleMenu layers={toggleMenuLayers} />
        <ContextMenu
          open={openContextMenu}
          onOpenChange={setOpenContextMenu}
          setContextMenuPickingInfo={setContextMenuPickingInfo}
          pickingInfo={contextMenuPickingInfo}
          layers={contextMenuLayers}
        />
      </DeckGL>
    </div>
  )
}
