import { renderWithProviders, screen } from 'app/utils/testUtils'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PanelType } from 'app/store/panels'
import { Panel, dataTestIds } from './Panel'
import { theme } from 'app/theme'

const panel: PanelType = {
  id: '123',
  rect: {
    x: 100,
    y: 100,
    width: 300,
    height: 700
  }
}

it('renders a component', async () => {
  renderWithProviders(<Panel {...panel} />)

  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it('renders panel with specified size', async () => {
  renderWithProviders(<Panel {...panel} />)

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(`height: ${panel.rect.height}px`)
  expect(container).toHaveStyle(`width: ${panel.rect.width}px`)
})

it('shrinks height and moves below on dragging top edge to the bottom', async () => {
  const moveOffset = 100
  renderWithProviders(<Panel {...panel} />)

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
  renderWithProviders(<Panel {...panel} />)

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
  renderWithProviders(<Panel {...panel} />)

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
  renderWithProviders(<Panel {...panel} />)

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

it('on click activate the panel', async () => {
  const handleClick = jest.fn()
  renderWithProviders(<Panel {...panel} onClick={handleClick} />)

  const container = screen.getByTestId(dataTestIds.container)
  userEvent.click(container)

  expect(handleClick).toBeCalled()
})

it('makes all PanelEdges as active if panel is active', async () => {
  renderWithProviders(<Panel {...panel} active />)

  const activeColor = theme.colors.blue
  for (const edgeSelector of Object.values(dataTestIds.edges)) {
    const edge = screen.getByTestId(edgeSelector)
    expect(edge).toHaveStyle(`background-color: ${activeColor}`)
  }
})
