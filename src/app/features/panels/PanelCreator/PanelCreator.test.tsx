import { renderWithProviders, screen } from 'app/utils/testUtils'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Panel } from 'app/store/panels'
import { PanelCreator, dataTestIds } from './PanelCreator'

const panel: Panel = {
  id: '123',
  rect: {
    x: 100,
    y: 100,
    width: 300,
    height: 700
  }
}

it('renders a component', async () => {
  renderWithProviders(<PanelCreator {...panel} />)

  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it('adds a new component on tap', async () => {
  renderWithProviders(<PanelCreator {...panel} />)
  const element = screen.getByTestId(dataTestIds.elementsContainer)

  fireEvent.touchStart(element)
  fireEvent.touchEnd(element)

  expect(element.childElementCount).toBe(1)
})

it('adds a new panel on click', async () => {
  renderWithProviders(<PanelCreator {...panel} />)
  const element = screen.getByTestId(dataTestIds.elementsContainer)

  userEvent.click(element)

  expect(element.childElementCount).toBe(1)
})

it('renders panel with specified size', async () => {
  renderWithProviders(<PanelCreator {...panel} />)

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(`height: ${panel.rect.height}px`)
  expect(container).toHaveStyle(`width: ${panel.rect.width}px`)
})

it('shrinks height and moves below on dragging top edge to the bottom', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...panel} />)

  const topEdge = screen.getByTestId(dataTestIds.edges.top)
  fireEvent.mouseDown(topEdge)
  fireEvent.mouseMove(topEdge, {
    clientX: 0,
    clientY: panel.rect.y + moveOffset
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(
    `transform: translate(100px, ${panel.rect.y + moveOffset}px); height: ${
      panel.rect.height - moveOffset
    }px`
  )
})

it('shrinks height on dragging bottom edge to the top', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...panel} />)

  const bottomEdge = screen.getByTestId(dataTestIds.edges.bottom)
  fireEvent.mouseDown(bottomEdge)
  fireEvent.mouseMove(bottomEdge, {
    clientX: 0,
    clientY: panel.rect.y + panel.rect.height - moveOffset
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`height: ${panel.rect.height - moveOffset}px`)
})

it('shrinks width on dragging right edge to the left', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...panel} />)

  const rightEdge = screen.getByTestId(dataTestIds.edges.right)
  fireEvent.mouseDown(rightEdge)
  fireEvent.mouseMove(rightEdge, {
    clientX: panel.rect.x + panel.rect.width - moveOffset,
    clientY: 0
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`width: ${panel.rect.width - moveOffset}px`)
})

it('shrinks width and shifts to the right on dragging left edge to the right', async () => {
  const moveOffset = 100
  renderWithProviders(<PanelCreator {...panel} />)

  const leftEdge = screen.getByTestId(dataTestIds.edges.left)
  fireEvent.mouseDown(leftEdge)
  fireEvent.mouseMove(leftEdge, {
    clientX: panel.rect.x + moveOffset,
    clientY: 0
  })

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(
    `transform: translate(${panel.rect.x + moveOffset}px, 100px); width: ${
      panel.rect.width - moveOffset
    }px`
  )
})
