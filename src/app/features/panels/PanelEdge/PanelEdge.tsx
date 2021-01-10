import { FC, useState, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'

import { PanelRect } from 'app/features/panels/PanelCreator'
import { getRectDiffBetweenPointsByPosition } from './services'

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

export type Position = 'top' | 'right' | 'bottom' | 'left'

export type PanelEdgeProps = {
  position: Position
  thickness?: number
  onMove: (offset: PanelRect) => void
}

export const PanelEdge: FC<PanelEdgeProps> = ({
  thickness = 6,
  position,
  onMove,
  ...rest
}) => {
  const [capturedPoint, setCapturedPoint] = useState<Point | null>(null)
  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (capturedPoint) {
        const { clientX, clientY } = event
        const moveToPoint = {
          x: clientX,
          y: clientY
        }
        setCapturedPoint(moveToPoint)
        onMove(
          getRectDiffBetweenPointsByPosition(
            capturedPoint,
            moveToPoint,
            position
          )
        )
      }
    },
    [capturedPoint, onMove, position]
  )

  const handleUncapture = useCallback(() => {
    setCapturedPoint(null)
  }, [])

  const handleCapture = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    setCapturedPoint({ x: clientX, y: clientY })
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUncapture)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUncapture)
    }
  }, [handleMove, handleUncapture])

  return (
    <Wrapper
      data-testid={dataTestIds.container}
      position={position}
      thickness={thickness}
      onMouseDown={handleCapture}
      {...rest}
    ></Wrapper>
  )
}
