import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextProvider } from './Context/ContextWorkout.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { AppRouter as App } from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthSync } from './Components/AuthSync.jsx'
import { RoutinesSync } from './Components/RoutinesSync.jsx'
import './css/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <UserProvider>
            <AuthSync />
            <App />
            <RoutinesSync />
        </UserProvider>
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)
