import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'

import App from 'app/App'
import { getConfiguredStore } from 'app/store'

const store = getConfiguredStore()

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
