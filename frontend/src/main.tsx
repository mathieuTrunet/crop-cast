import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/MainPage'
import { LocationProvider } from './lib/context/LocationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocationProvider>
      <MainPage />
    </LocationProvider>
  </StrictMode>
)
