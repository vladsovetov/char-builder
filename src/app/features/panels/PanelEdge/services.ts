import { Point, MoveDirection } from './PanelEdge'

export const getOffsetByAllowedDirection = (
  capturedPoint: Point,
  moveToPoint: Point,
  direction: MoveDirection
) => {
  switch (direction) {
    case 'top':
    case 'bottom':
      return { x: capturedPoint.x, y: moveToPoint.y - capturedPoint.y }

    case 'left':
    case 'right':
      return { y: capturedPoint.y, x: moveToPoint.x - capturedPoint.x }

    default:
      return capturedPoint
  }
}
