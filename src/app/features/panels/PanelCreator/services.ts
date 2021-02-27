import { Point, Position } from '../PanelEdge'
import { PanelRect } from './PanelCreator'

export const getPanelRectOnEdgeMove = (
  panelRect: PanelRect,
  moveEdgePoint: Point,
  edgePosition: Position
): PanelRect => {
  switch (edgePosition) {
    case 'top': {
      const newY = moveEdgePoint.y > 0 ? moveEdgePoint.y : 0
      const newHeight = panelRect.height - (newY - panelRect.y)
      return {
        ...panelRect,
        y: newHeight > 0 ? newY : panelRect.y + panelRect.height,
        height: newHeight > 0 ? newHeight : 0
      }
    }
    case 'bottom': {
      const newHeight = moveEdgePoint.y - panelRect.y
      return {
        ...panelRect,
        height: newHeight > 0 ? newHeight : 0
      }
    }
    case 'right': {
      const newWidth = moveEdgePoint.x - panelRect.x
      return {
        ...panelRect,
        width: newWidth > 0 ? newWidth : 0
      }
    }
    case 'left': {
      const newX = moveEdgePoint.x > 0 ? moveEdgePoint.x : 0
      const newWidth = panelRect.width - (newX - panelRect.x)
      return {
        ...panelRect,
        x: newWidth > 0 ? newX : panelRect.x + panelRect.width,
        width: newWidth > 0 ? newWidth : 0
      }
    }
  }
}
