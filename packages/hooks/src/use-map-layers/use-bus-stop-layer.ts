'use client'

import type { LayersList } from '@deck.gl/core'
import { IconLayer } from '@deck.gl/layers'
import type { FeatureCollection, Point } from 'geojson'
import { useEffect, useMemo, useState } from 'react'

import busFront from '../assets/bus-front.svg'

export type RawBusStop = {
  data_versao: string
  id_parada: string
  nome_parada: string
}

export type BusStop = {
  data_versao: string
  id_parada: string
  nome_parada: string
  longitude: number
  latitude: number
}

export interface UseBusStopLayer {
  id: string
  data: BusStop[]
  layers: LayersList
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

export function useBusStopLayer(): UseBusStopLayer {
  const id = 'BusStops'
  const [data, setData] = useState<BusStop[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchCameras = async () => {
      const data: BusStop[] = await fetch(
        'https://raw.githubusercontent.com/prefeitura-rio/storage/master/layers/paradas_onibus.geojson',
      ).then((data) =>
        data.json().then((data: FeatureCollection<Point, RawBusStop>) =>
          data.features.map((feature) => ({
            ...feature.properties,
            data_versao: feature.properties.data_versao,
            id_parada: feature.properties.id_parada,
            nome_parada: feature.properties.nome_parada,
            latitude: feature.geometry.coordinates[1] as number,
            longitude: feature.geometry.coordinates[0] as number,
          })),
        ),
      )

      setData(data)
    }
    fetchCameras()
  }, [])

  const baseLayer = useMemo(
    () =>
      new IconLayer<BusStop>({
        id,
        data,
        getSize: 24,
        visible: isVisible,
        getIcon: () => ({
          url: busFront.src,
          width: 48,
          height: 48,
          mask: false,
        }),
        getPosition: (info) => [info.longitude, info.latitude],
      }),

    [data, isVisible],
  )

  return {
    id,
    data,
    isVisible,
    setIsVisible,
    layers: [baseLayer],
  }
}
