import { renderWithProviders, screen } from 'app/utils/testUtils'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PanelCreator } from './PanelCreator'

const containerId = 'panel-creator'

it('renders a component', async () => {
  renderWithProviders(<PanelCreator />)

  expect(screen.getByTestId(containerId)).toBeInTheDocument()
})

it('adds a new component on tap', async () => {
  renderWithProviders(<PanelCreator />)
  const element = screen.getByTestId(containerId)

  fireEvent.touchStart(element)
  fireEvent.touchEnd(element)

  expect(element.childElementCount).toBe(1)
})

it('adds a new panel on click', async () => {
  renderWithProviders(<PanelCreator />)
  const element = screen.getByTestId(containerId)

  userEvent.click(element)

  expect(element.childElementCount).toBe(1)
})
