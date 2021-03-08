import { FC, useState, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'

export const dataTestIds = {
  container: 'panel-edge'
}

const Wrapper = styled.div<
  Pick<PanelEdgeProps, 'position' | 'thickness' | 'active'>
>`
  position: absolute;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.blue : theme.colors.secondary};

  ${({ position, thickness }) => {
    switch (position) {
      case 'top':
        return css`
          top: 0;
          width: 100%;
          height: ${thickness}px;
          cursor: row-resize;
        `
      case 'right':
        return css`
          right: 0;
          width: ${thickness}px;
          height: 100%;
          cursor: col-resize;
        `
      case 'bottom':
        return css`
          bottom: 0;
          width: 100%;
          height: ${thickness}px;
          cursor: row-resize;
        `
      case 'left':
        return css`
          left: 0;
          width: ${thickness}px;
          height: 100%;
          cursor: col-resize;
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
  onMove: (point: Point, edgePosition: Position) => void
  thickness?: number
  active?: boolean
}

export const PanelEdge: FC<PanelEdgeProps> = ({
  thickness = 2,
  position,
  onMove,
  active,
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
        onMove(moveToPoint, position)
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
      active={active}
      {...rest}
    ></Wrapper>
  )
}
