import { FC, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { theme } from 'app/theme'
import { getConfiguredStore, RootState } from 'app/store'

type Options = Omit<RenderOptions, 'queries'> & {
  route?: string
  initialState?: Partial<RootState>
}

export const renderWithProviders = (
  component: ReactElement,
  options?: Options
) => {
  const WrappedWithProviders: FC = ({ children }) => {
    if (options?.route) {
      window.history.pushState({}, '', options?.route)
    }
    let store = getConfiguredStore()
    if (options?.initialState) {
      const updatedState = { ...store.getState(), ...options?.initialState }
      store = getConfiguredStore(updatedState)
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }
  return render(component, { wrapper: WrappedWithProviders, ...options })
}

// re-export everything
export * from '@testing-library/react'
