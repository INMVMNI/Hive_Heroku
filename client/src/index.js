import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'

import './styles/index.scss'

// import { HashRouter } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

//* **Switched from Router to HashRouter to stop "Cannot Get /"

ReactDOM.render(
  <Router history={history}>
    <App/>
  </Router>,
  document.getElementById('App')
)
