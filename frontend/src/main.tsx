import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/MainPage'
import { LocationProvider } from './lib/context/LocationContext'
import { TimeProvider } from './lib/context/TimeContext'
import { QueryProvider } from './lib/context/QueryProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <LocationProvider>
        <TimeProvider>
          <MainPage />
        </TimeProvider>
      </LocationProvider>
    </QueryProvider>
  </StrictMode>
)
