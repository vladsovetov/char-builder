import { FC, useState } from 'react'
import styled from 'styled-components'

import { PanelEdge, Point } from 'app/features/panels/PanelEdge'

const Wrapper = styled.div`
  position: relative;
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
    bottom: `${dataTestIdPrefix}-bottom-edge`
  }
}

type PanelCreatorProps = {
  width?: number
  height?: number
}

export const PanelCreator: FC<PanelCreatorProps> = ({
  width = 400,
  height = 600
}) => {
  const [size, setSize] = useState({
    width,
    height
  })
  const [elements, setElements] = useState<number[]>([])
  const handleAddElement = () => {
    setElements([1])
  }

  const handleEdgeMove = (offset: Point) => {
    setSize({
      width: size.width + offset.x,
      height: size.height + offset.y
    })
  }
  return (
    <Wrapper
      data-testid={dataTestIds.container}
      onTouchStart={handleAddElement}
      onClick={handleAddElement}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`
      }}
    >
      <div data-testid={dataTestIds.edgesContainer}>
        <PanelEdge
          data-testid={dataTestIds.edges.bottom}
          position="bottom"
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
