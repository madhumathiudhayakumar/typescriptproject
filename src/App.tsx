
import { Provider } from 'react-redux'
import './App.css'

import store from './store'
import AppRoutes from './appInnovation/routes/routes'
// import LoginForm from './components/loginForm'

function App() {

  return (
    <Provider store={store}>
     <AppRoutes/>

    </Provider>
  )
}

export default App
