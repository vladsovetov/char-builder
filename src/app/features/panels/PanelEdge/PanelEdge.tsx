import { FC, useState, MouseEvent } from 'react'
import styled, { css } from 'styled-components'

import { getOffsetByAllowedDirection } from './services'

export const dataTestIds = {
  container: 'panel-edge'
}

const Wrapper = styled.div<Pick<PanelEdgeProps, 'position' | 'thickness'>>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondary};
  cursor: row-resize;

  ${({ position, thickness }) => {
    switch (position) {
      case 'top':
        return css`
          top: 0;
          width: 100%;
          height: ${thickness}px;
        `
      case 'right':
        return css`
          right: 0;
          width: ${thickness}px;
          height: 100%;
        `
      case 'bottom':
        return css`
          bottom: 0;
          width: 100%;
          height: ${thickness}px;
        `
      case 'left':
        return css`
          left: 0;
          width: ${thickness}px;
          height: 100%;
        `
    }
  }}
`

export type Point = {
  x: number
  y: number
}

export type MoveDirection = 'top' | 'right' | 'bottom' | 'left'

export type PanelEdgeProps = {
  position: MoveDirection
  thickness?: number
  onMove: (offset: Point) => void
}

export const PanelEdge: FC<PanelEdgeProps> = ({
  thickness = 6,
  position,
  onMove,
  ...rest
}) => {
  const [capturedPoint, setCapturedPoint] = useState<Point | null>(null)

  const handleCapture = (event: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    setCapturedPoint({ x: clientX, y: clientY })
  }
  const handleUncapture = () => {
    setCapturedPoint(null)
  }
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (capturedPoint) {
      const moveToPoint = {
        x: event.clientX,
        y: event.clientY
      }
      setCapturedPoint(moveToPoint)
      onMove(getOffsetByAllowedDirection(capturedPoint, moveToPoint, position))
    }
  }
  return (
    <Wrapper
      data-testid={dataTestIds.container}
      position={position}
      thickness={thickness}
      onMouseDown={handleCapture}
      onMouseUp={handleUncapture}
      onMouseMove={handleMove}
      {...rest}
    ></Wrapper>
  )
}
