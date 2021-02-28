import { renderWithProviders, screen } from 'app/utils/testUtils'

import { PanelEditor, dataTestIds } from './PanelEditor'

test('renders component', () => {
  renderWithProviders(<PanelEditor />)

  expect(screen.getByTestId('panel-editor')).toBeInTheDocument()
})

test('shows when receives open prop', () => {
  renderWithProviders(<PanelEditor open />)

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`height: 200px`)
})

test('hides when receives falsy open prop', () => {
  renderWithProviders(<PanelEditor open={false} />)

  const container = screen.getByTestId(dataTestIds.container)
  expect(container).toHaveStyle(`height: 0`)
})
