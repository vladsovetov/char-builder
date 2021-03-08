import userEvent from '@testing-library/user-event'
import { renderWithProviders, screen } from 'app/utils/testUtils'

import { AdminPage, dataTestIds } from './AdminPage'
import { dataTestIds as PanelDataTestIds } from 'app/features/panels/Panel'
import { dataTestIds as PanelEditorDataTestIds } from 'app/features/panels/PanelEditor'

const containerId = 'admin-page'

it('renders a component', async () => {
  renderWithProviders(<AdminPage />)

  expect(screen.getByTestId(containerId)).toBeInTheDocument()
})

it('renders PageWrapper component', async () => {
  renderWithProviders(<AdminPage />)

  expect(screen.getByTestId('page-wrapper')).toBeInTheDocument()
})

it('renders Panel component', async () => {
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

  expect(screen.getByTestId(PanelDataTestIds.container)).toBeInTheDocument()
})

it('adds Panel after click on add panel button', async () => {
  renderWithProviders(<AdminPage />, {
    initialState: {
      panels: {
        activePanelId: '',
        items: []
      }
    }
  })

  const addPanelButton = screen.getByTestId(dataTestIds.addPanelButton)
  userEvent.click(addPanelButton)

  expect(screen.getByTestId(PanelDataTestIds.container)).toBeInTheDocument()
})

it('shows PanelEditor on Panel selection', async () => {
  renderWithProviders(<AdminPage />, {
    initialState: {
      panels: {
        activePanelId: '',
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

  const panel = screen.getByTestId(PanelDataTestIds.container)
  userEvent.click(panel)

  expect(screen.getByTestId(PanelEditorDataTestIds.container)).not.toHaveStyle(
    'height: 0'
  )
})

it('hides PanelEditor on Panel deselection', async () => {
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

  const panel = screen.getByTestId(PanelDataTestIds.container)
  userEvent.click(panel)

  expect(screen.getByTestId(PanelEditorDataTestIds.container)).toHaveStyle(
    'height: 0'
  )
})
