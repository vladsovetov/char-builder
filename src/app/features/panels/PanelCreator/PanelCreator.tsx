import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 10rem;
  width: 100%;

  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  max-width: 40rem;
`

export const PanelCreator = () => {
  const [elements, setElements] = useState<number[]>([])
  const handleAddElement = () => {
    setElements([1])
  }
  return (
    <Wrapper
      data-testid="panel-creator"
      onTouchStart={handleAddElement}
      onClick={handleAddElement}
    >
      {elements.map((element, index) => (
        <div key={index}></div>
      ))}
    </Wrapper>
  )
}
