import { renderWithProviders, screen } from 'app/utils/testUtils'
import App from './App'

it('renders admin page', () => {
  renderWithProviders(<App />, {
    route: '/admin'
  })

  expect(screen.getByText('Admin page')).toBeInTheDocument()
})
