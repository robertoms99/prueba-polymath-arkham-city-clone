import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'
import App from './App'

const RootReactElement = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const containerElement = document.getElementById('root') ?? document.createElement('div')

if (!document.body.contains(containerElement)) {
  containerElement.className = 'root'
  document.body.appendChild(containerElement)
}

ReactDOM.render(RootReactElement, containerElement)
