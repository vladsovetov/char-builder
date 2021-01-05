import { renderWithProviders, screen } from 'app/utils/testUtils'

import { AdminPage } from './AdminPage'

const containerId = 'admin-page'

it('renders a component', async () => {
  renderWithProviders(<AdminPage />)

  expect(screen.getByTestId(containerId)).toBeInTheDocument()
})

it('renders PanelCreator component', async () => {
  renderWithProviders(<AdminPage />)

  expect(screen.getByTestId('panel-creator')).toBeInTheDocument()
})
