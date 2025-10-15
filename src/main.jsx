import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextProvider } from './Context/ContextWorkout.jsx'
import { AppRouter as App } from './App.jsx'
import { BrowserRouter } from 'react-router'
import './css/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)
