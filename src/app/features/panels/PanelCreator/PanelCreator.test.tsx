import { renderWithProviders, screen } from 'app/utils/testUtils'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PanelCreator, dataTestIds, PanelRect } from './PanelCreator'

const panelRect: PanelRect = {
  x: 0,
  y: 0,
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
  renderWithProviders(<PanelCreator {...panelRect} />)

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(`height: ${panelRect.height}px`)
  expect(container).toHaveStyle(`width: ${panelRect.width}px`)
})

it('shrinks height and moves below on dragging top edge to the bottom', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...panelRect} />)

  const topEdge = screen.getByTestId(dataTestIds.edges.top)
  fireEvent.mouseDown(topEdge)
  fireEvent.mouseMove(topEdge, {
    clientX: 0,
    clientY: moveOffset
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(
    `transform: translate(0px, ${moveOffset}px); height: ${
      panelRect.height - moveOffset
    }px`
  )
})

it('shrinks height on dragging bottom edge to the top', async () => {
  const moveOffset = -100
  renderWithProviders(<PanelCreator {...panelRect} />)

  const bottomEdge = screen.getByTestId(dataTestIds.edges.bottom)
  fireEvent.mouseDown(bottomEdge)
  fireEvent.mouseMove(bottomEdge, {
    clientX: 0,
    clientY: moveOffset
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`height: ${panelRect.height + moveOffset}px`)
})

it('shrinks width on dragging right edge to the left', async () => {
  const moveOffset = -100
  renderWithProviders(<PanelCreator {...panelRect} />)

  const rightEdge = screen.getByTestId(dataTestIds.edges.right)
  fireEvent.mouseDown(rightEdge)
  fireEvent.mouseMove(rightEdge, {
    clientX: moveOffset,
    clientY: 0
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`width: ${panelRect.width + moveOffset}px`)
})

it('shrinks width and shifts to the right on dragging left edge to the right', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...panelRect} />)

  const leftEdge = screen.getByTestId(dataTestIds.edges.left)
  fireEvent.mouseDown(leftEdge)
  fireEvent.mouseMove(leftEdge, {
    clientX: moveOffset,
    clientY: 0
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(
    `transform: translate(${moveOffset}px, 0px); width: ${
      panelRect.width - moveOffset
    }px`
  )
})
