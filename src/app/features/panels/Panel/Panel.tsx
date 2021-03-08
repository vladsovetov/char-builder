import { FC, useState } from 'react'
import styled from 'styled-components'

import { PanelType, PanelRect } from 'app/store/panels'
import { PanelEdge, Point, Position } from 'app/features/panels/PanelEdge'
import { getPanelRectOnEdgeMove } from './services'

const Wrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
`

const dataTestIdPrefix = 'panel'
export const dataTestIds = {
  container: dataTestIdPrefix,
  edgesContainer: `${dataTestIdPrefix}-edges`,
  edges: {
    top: `${dataTestIdPrefix}-top-edge`,
    right: `${dataTestIdPrefix}-right-edge`,
    bottom: `${dataTestIdPrefix}-bottom-edge`,
    left: `${dataTestIdPrefix}-left-edge`
  }
}

type PanelProps = PanelType & {
  onClick?: (id: string) => void
  active?: boolean
}

export const Panel: FC<PanelProps> = ({
  rect: { x = 0, y = 0, width = 400, height = 600 },
  active = false,
  onClick,
  ...props
}) => {
  const [panelRect, setPanelRect] = useState<PanelRect>({
    x,
    y,
    width,
    height
  })
  const handleClick = () => {
    onClick && onClick(props.id)
  }

  const handleEdgeMove = (point: Point, edgePosition: Position) => {
    const newPanelRect = getPanelRectOnEdgeMove(panelRect, point, edgePosition)
    setPanelRect(newPanelRect)
  }

  return (
    <Wrapper
      data-testid={dataTestIds.container}
      onTouchStart={handleClick}
      onClick={handleClick}
      style={{
        transform: `translate(${panelRect.x}px, ${panelRect.y}px)`,
        width: `${panelRect.width}px`,
        height: `${panelRect.height}px`
      }}
    >
      <div data-testid={dataTestIds.edgesContainer}>
        <PanelEdge
          data-testid={dataTestIds.edges.top}
          position="top"
          onMove={handleEdgeMove}
          active={active}
        />
        <PanelEdge
          data-testid={dataTestIds.edges.right}
          position="right"
          onMove={handleEdgeMove}
          active={active}
        />
        <PanelEdge
          data-testid={dataTestIds.edges.bottom}
          position="bottom"
          onMove={handleEdgeMove}
          active={active}
        />
        <PanelEdge
          data-testid={dataTestIds.edges.left}
          position="left"
          onMove={handleEdgeMove}
          active={active}
        />
      </div>
    </Wrapper>
  )
}
