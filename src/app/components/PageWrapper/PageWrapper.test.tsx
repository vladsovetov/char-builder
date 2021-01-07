import { renderWithProviders, screen } from 'app/utils/testUtils'

import { PageWrapper } from './PageWrapper'

const containerId = 'page-wrapper'

it('renders a component', async () => {
  renderWithProviders(<PageWrapper />)

  expect(screen.getByTestId(containerId)).toBeInTheDocument()
})

it('component should be fully stretched on the screen', async () => {
  renderWithProviders(<PageWrapper />)

  const container = screen.getByTestId(containerId)

  expect(container).toHaveStyle('width: 100vw')
  expect(container).toHaveStyle('height: 100vh')
})
