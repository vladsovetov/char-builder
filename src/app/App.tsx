import { Route, Switch } from 'react-router-dom'

import { AdminPage } from 'app/pages/Admin'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/admin" component={AdminPage} />
  </Switch>
)

export default App
