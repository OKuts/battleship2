import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {Game} from './components/Game'
import {store} from './store/store'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Game/>
  </Provider>
)
