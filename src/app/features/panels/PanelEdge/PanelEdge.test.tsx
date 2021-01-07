import { FC } from 'react'
import { renderWithProviders, screen } from 'app/utils/testUtils'
import { fireEvent } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import { PanelEdge, dataTestIds, PanelEdgeProps } from './PanelEdge'

const defaultProps: PanelEdgeProps = {
  onMove: jest.fn(),
  position: 'top'
}

const WrappedPanelEdge: FC<Partial<PanelEdgeProps>> = props => {
  return (
    <div style={{ position: 'relative', width: 400, height: 800 }}>
      <PanelEdge {...defaultProps} {...props} />
    </div>
  )
}

it('renders a component', async () => {
  renderWithProviders(<WrappedPanelEdge position="top" />)

  expect(screen.getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it('renders top edge with specific thickness', () => {
  const thickness = 10
  renderWithProviders(<WrappedPanelEdge position="top" thickness={thickness} />)

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(`top: 0px; width: 100%; height: ${thickness}px`)
})

it('renders right edge with specific thickness', () => {
  const thickness = 10
  renderWithProviders(
    <WrappedPanelEdge position="right" thickness={thickness} />
  )

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(
    `right: 0px; height: 100%; width: ${thickness}px`
  )
})

it('renders bottom edge with specific thickness', () => {
  const thickness = 10
  renderWithProviders(
    <WrappedPanelEdge position="bottom" thickness={thickness} />
  )

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(
    `bottom: 0px; width: 100%; height: ${thickness}px`
  )
})

it('renders left edge with specific thickness', () => {
  const thickness = 10
  renderWithProviders(
    <WrappedPanelEdge position="left" thickness={thickness} />
  )

  const container = screen.getByTestId(dataTestIds.container)

  expect(container).toHaveStyle(
    `left: 0px; height: 100%; width: ${thickness}px`
  )
})

it('allows to move edge only after mouseDown event', () => {
  const handleMove = jest.fn()
  renderWithProviders(<WrappedPanelEdge position="top" onMove={handleMove} />)

  const container = screen.getByTestId(dataTestIds.container)
  fireEvent.mouseMove(container, { clientY: 100 })

  expect(handleMove).toBeCalledTimes(0)

  fireEvent.mouseDown(container)
  fireEvent.mouseMove(container, { clientY: 100 })

  expect(handleMove).toBeCalledTimes(1)
})
