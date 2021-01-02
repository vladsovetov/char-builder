import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from 'app/theme'
import { AdminPage } from 'app/pages/Admin'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Switch>
      <Route exact path="/admin" component={AdminPage} />
    </Switch>
  </ThemeProvider>
)

export default App
