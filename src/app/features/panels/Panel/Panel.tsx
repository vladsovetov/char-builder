import { FC, useState } from 'react'
import styled from 'styled-components'

import { Panel, PanelRect } from 'app/store/panels'
import { PanelEdge, Point, Position } from 'app/features/panels/PanelEdge'
import { getPanelRectOnEdgeMove } from './services'

const Wrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
`

const dataTestIdPrefix = 'panel-creator'
export const dataTestIds = {
  container: dataTestIdPrefix,
  elementsContainer: `${dataTestIdPrefix}-elements`,
  edgesContainer: `${dataTestIdPrefix}-edges`,
  edges: {
    top: `${dataTestIdPrefix}-top-edge`,
    right: `${dataTestIdPrefix}-right-edge`,
    bottom: `${dataTestIdPrefix}-bottom-edge`,
    left: `${dataTestIdPrefix}-left-edge`
  }
}

export const PanelCreator: FC<Panel> = ({
  rect: { x = 0, y = 0, width = 400, height = 600 }
}) => {
  const [panelRect, setPanelRect] = useState<PanelRect>({
    x,
    y,
    width,
    height
  })
  const [elements, setElements] = useState<number[]>([])
  const handleAddElement = () => {
    setElements([1])
  }

  const handleEdgeMove = (point: Point, edgePosition: Position) => {
    const newPanelRect = getPanelRectOnEdgeMove(panelRect, point, edgePosition)
    setPanelRect(newPanelRect)
  }

  return (
    <Wrapper
      data-testid={dataTestIds.container}
      onTouchStart={handleAddElement}
      onClick={handleAddElement}
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
        />
        <PanelEdge
          data-testid={dataTestIds.edges.right}
          position="right"
          onMove={handleEdgeMove}
        />
        <PanelEdge
          data-testid={dataTestIds.edges.bottom}
          position="bottom"
          onMove={handleEdgeMove}
        />
        <PanelEdge
          data-testid={dataTestIds.edges.left}
          position="left"
          onMove={handleEdgeMove}
        />
      </div>
      <div data-testid={dataTestIds.elementsContainer}>
        {elements.map((element, index) => (
          <div key={index}></div>
        ))}
      </div>
    </Wrapper>
  )
}
