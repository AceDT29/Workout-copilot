import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExercisesProvider } from './Context/ExercisesContext.jsx'
import { ContextProvider } from './Context/ContextWorkout.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { AppRouter as App } from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthSync } from './Components/AuthSync.jsx'
import './css/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExercisesProvider>
      <ContextProvider>
        <BrowserRouter>
          <UserProvider>
            <AuthSync />
            <App />
          </UserProvider>
        </BrowserRouter>
      </ContextProvider>
    </ExercisesProvider>
  </StrictMode>,
)
