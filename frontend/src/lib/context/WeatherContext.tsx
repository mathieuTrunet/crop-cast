import { createContext, useContext, ReactNode, useState } from 'react'
import { WeatherGeneral, Temperature, Humidity, LightExposure } from '../types'

interface WeatherContextType {
  weatherGeneral: WeatherGeneral | null
  setWeatherGeneral: (data: WeatherGeneral | null) => void
  temperature: Temperature | null
  setTemperature: (data: Temperature | null) => void
  humidity: Humidity | null
  setHumidity: (data: Humidity | null) => void
  lightExposure: LightExposure | null
  setLightExposure: (data: LightExposure | null) => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weatherGeneral, setWeatherGeneral] = useState<WeatherGeneral | null>(null)
  const [temperature, setTemperature] = useState<Temperature | null>(null)
  const [humidity, setHumidity] = useState<Humidity | null>(null)
  const [lightExposure, setLightExposure] = useState<LightExposure | null>(null)

  return (
    <WeatherContext.Provider
      value={{
        weatherGeneral,
        setWeatherGeneral,
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        lightExposure,
        setLightExposure,
      }}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}
