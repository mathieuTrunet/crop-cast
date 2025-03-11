import { WeatherGeneral, Temperature, Humidity, LightExposure } from '../types'

export interface WeatherParams {
  latitude: number
  longitude: number
}

export const fetchWeatherGeneral = async ({ latitude, longitude }: WeatherParams): Promise<WeatherGeneral> => {
  const response = await fetch(`/weather/general?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch weather general data')
  }

  return response.json()
}

export const fetchTemperature = async ({ latitude, longitude }: WeatherParams): Promise<Temperature> => {
  const response = await fetch(`/weather/temperature?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch temperature data')
  }

  return response.json()
}

export const fetchHumidity = async ({ latitude, longitude }: WeatherParams): Promise<Humidity> => {
  const response = await fetch(`/weather/humidity?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch humidity data')
  }

  return response.json()
}

export const fetchLightExposure = async ({ latitude, longitude }: WeatherParams): Promise<LightExposure> => {
  const response = await fetch(`/weather/light-exposure?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch light exposure data')
  }

  return response.json()
}
