import { renderWithProviders, screen } from 'app/utils/testUtils'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PanelCreator, dataTestIds } from './PanelCreator'

const size = {
  width: 300,
  height: 700
}

it('renders a component', async () => {
  renderWithProviders(<PanelCreator />)

  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it('adds a new component on tap', async () => {
  renderWithProviders(<PanelCreator />)
  const element = screen.getByTestId(dataTestIds.elementsContainer)

  fireEvent.touchStart(element)
  fireEvent.touchEnd(element)

  expect(element.childElementCount).toBe(1)
})

it('adds a new panel on click', async () => {
  renderWithProviders(<PanelCreator />)
  const element = screen.getByTestId(dataTestIds.elementsContainer)

  userEvent.click(element)

  expect(element.childElementCount).toBe(1)
})

it('renders panel with specified size', async () => {
  renderWithProviders(<PanelCreator {...size} />)

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(`height: ${size.height}px`)
  expect(container).toHaveStyle(`width: ${size.width}px`)
})

it('shrinks height on dragging bottom border', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...size} />)

  const bottomEdge = screen.getByTestId(dataTestIds.edges.bottom)
  fireEvent.mouseDown(bottomEdge)
  fireEvent.mouseMove(bottomEdge, {
    clientX: 0,
    clientY: moveOffset
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`height: ${size.height + moveOffset}px`)
})
