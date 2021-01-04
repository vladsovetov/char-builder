import { useState } from 'react'

export const PanelCreator = () => {
  const [elements, setElements] = useState<number[]>([])
  const handleAddElement = () => {
    setElements([1])
  }
  return (
    <div
      data-testid="panel-creator"
      onTouchStart={handleAddElement}
      onClick={handleAddElement}
    >
      {elements.map((element, index) => (
        <div key={index}></div>
      ))}
    </div>
  )
}
