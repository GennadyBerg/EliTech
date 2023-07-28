import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {DbProvider} from "./assets/db/DbProvider"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DbProvider>
      <App />
    </DbProvider>
  </React.StrictMode>,
)
