'use client'

import { type PickingInfo } from '@deck.gl/core'
import { Popover, PopoverContent } from '@ed-rio/ui/molecules/popover'
import { useState } from 'react'

import { calculateTooltipAbsolutePosition } from '../../../../utils/calculate-tooltip-absolute-position'
import type { ContextMenuLayer } from '../../types'

interface ContextMenuProps {
  pickingInfo: PickingInfo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  setContextMenuPickingInfo: (pickingInfo: PickingInfo | null) => void
  layers: ContextMenuLayer[]
}

export function ContextMenu({
  pickingInfo,
  onOpenChange,
  setContextMenuPickingInfo,
  open,
  layers,
}: ContextMenuProps) {
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null)
  const cameraLayer = layers.find((item) => item.id === 'cameras')

  const { top, left } = pickingInfo
    ? calculateTooltipAbsolutePosition(
        pickingInfo,
        cardRef?.clientWidth,
        cardRef?.clientHeight,
      )
    : { top: 0, left: 0 }

  const Content = ({ pickingInfo }: { pickingInfo: PickingInfo }) => {
    const layer = layers.find((layer) => layer.id === pickingInfo.layer?.id)
    if (layer) return layer.component({ pickingInfo })
  }

  function handleOnOpenChange(e: boolean) {
    if (e === false) {
      setContextMenuPickingInfo(null)
      onOpenChange(false)
    }
    onOpenChange(true)
  }

  return (
    <Popover open={open} onOpenChange={handleOnOpenChange} modal={false}>
      {pickingInfo?.layer?.id &&
        layers.map((item) => item.id).includes(pickingInfo.layer.id) && (
          <PopoverContent
            ref={(ref) => setCardRef(ref)}
            style={{
              position: 'absolute',
              top,
              left,
              width: '400px',
            }}
          >
            <Content pickingInfo={pickingInfo} />
          </PopoverContent>
        )}
      {cameraLayer && (
        <PopoverContent
          ref={(ref) => setCardRef(ref)}
          style={{
            position: 'absolute',
            top,
            left,
            width: '400px',
            display: pickingInfo ? 'block' : 'none',
          }}
        >
          {pickingInfo && cameraLayer.component({ pickingInfo })}
        </PopoverContent>
      )}
    </Popover>
  )
}
