export type Panel = {
  id: string
  rect: PanelRect
}

export type PanelRect = {
  x: number
  y: number
  width: number
  height: number
}

export interface PanelsState {
  activePanelId: string
  items: Panel[]
}
