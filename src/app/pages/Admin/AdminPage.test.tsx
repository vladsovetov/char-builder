import { renderWithProviders, screen } from 'app/utils/testUtils'

import { AdminPage } from './AdminPage'

const containerId = 'admin-page'

it('renders a component', async () => {
  renderWithProviders(<AdminPage />)

  expect(screen.getByTestId(containerId)).toBeInTheDocument()
})

it('renders PageWrapper component', async () => {
  renderWithProviders(<AdminPage />)

  expect(screen.getByTestId('page-wrapper')).toBeInTheDocument()
})

it('renders PanelCreator component', async () => {
  renderWithProviders(<AdminPage />, {
    initialState: {
      panels: {
        activePanelId: '123',
        items: [
          {
            id: '123',
            rect: {
              x: 100,
              y: 100,
              height: 100,
              width: 100
            }
          }
        ]
      }
    }
  })

  expect(screen.getByTestId('panel-creator')).toBeInTheDocument()
})
