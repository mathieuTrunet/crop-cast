import { WeatherGeneral, Temperature, Humidity, LightExposure } from '../types'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
const API_URL_ENDPOINT = `${API_BASE_URL}/weather`

export interface WeatherParams {
  latitude: number
  longitude: number
}

export const fetchWeatherGeneral = async ({ latitude, longitude }: WeatherParams): Promise<WeatherGeneral> => {
  const response = await fetch(`${API_URL_ENDPOINT}/general?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch weather general data')
  }

  return response.json()
}

export const fetchTemperature = async ({ latitude, longitude }: WeatherParams): Promise<Temperature> => {
  const response = await fetch(`${API_URL_ENDPOINT}/temperature?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch temperature data')
  }

  return response.json()
}

export const fetchHumidity = async ({ latitude, longitude }: WeatherParams): Promise<Humidity> => {
  const response = await fetch(`${API_URL_ENDPOINT}/humidity?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch humidity data')
  }

  return response.json()
}

export const fetchLightExposure = async ({ latitude, longitude }: WeatherParams): Promise<LightExposure> => {
  const response = await fetch(`${API_URL_ENDPOINT}/light-exposure?latitude=${latitude}&longitude=${longitude}`)

  if (!response.ok) {
    throw new Error('Failed to fetch light exposure data')
  }

  return response.json()
}
