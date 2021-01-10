import { PanelRect } from '../PanelCreator'
import { Point, Position } from './PanelEdge'

export const getRectDiffBetweenPointsByPosition = (
  capturedPoint: Point,
  moveToPoint: Point,
  position: Position
): PanelRect => {
  const offsetY = moveToPoint.y - capturedPoint.y
  const offsetX = moveToPoint.x - capturedPoint.x
  switch (position) {
    case 'top':
      return {
        x: 0,
        y: offsetY,
        width: 0,
        height: offsetY === 0 ? 0 : -offsetY
      }

    case 'bottom':
      return {
        x: 0,
        y: 0,
        width: 0,
        height: offsetY
      }

    case 'left':
      return {
        x: offsetX,
        y: 0,
        width: offsetX === 0 ? 0 : -offsetX,
        height: 0
      }

    case 'right':
      return {
        x: 0,
        y: 0,
        width: offsetX,
        height: 0
      }
  }
}
