import { FC, useState } from 'react'
import styled from 'styled-components'

import { PanelEdge } from 'app/features/panels/PanelEdge'

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 40rem;
  max-height: 100rem;
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

export type PanelRect = {
  x: number
  y: number
  width: number
  height: number
}

type PanelCreatorProps = {
  x?: number
  y?: number
  width?: number
  height?: number
}

export const PanelCreator: FC<PanelCreatorProps> = ({
  x = 0,
  y = 0,
  width = 400,
  height = 600
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

  const handleEdgeMove = (rectDiff: PanelRect) => {
    setPanelRect(({ x, y, width, height }) => ({
      x: x + rectDiff.x,
      y: y + rectDiff.y,
      width: width + rectDiff.width,
      height: height + rectDiff.height
    }))
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
