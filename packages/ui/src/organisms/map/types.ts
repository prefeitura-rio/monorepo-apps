import type { PickingInfo } from '@deck.gl/core'

export type LayerToggleMenuItem = {
  name: string
  icon: React.ReactNode
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

export type ContextMenuLayer = {
  id: string
  component: React.FC<{ pickingInfo: PickingInfo }>
}
