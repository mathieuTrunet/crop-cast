import { useQuery } from '@tanstack/react-query'
import {
  fetchWeatherGeneral,
  fetchTemperature,
  fetchHumidity,
  fetchLightExposure,
  WeatherParams,
} from '../api/weatherApi'

export const weatherCodeMap: Record<number, string> = {
  0: 'Ciel dégagé',
  1: 'Ciel principalement dégagé',
  2: 'Ciel partiellement nuageux',
  3: 'Ciel couvert',
  45: 'Brouillard',
  48: 'Brouillard avec givre',
  51: 'Bruine légère',
  53: 'Bruine modérée',
  55: 'Bruine dense',
  56: 'Bruine avec givre légère',
  57: 'Bruine avec givre dense',
  61: 'Pluie légère',
  63: 'Pluie modérée',
  65: 'Pluie forte',
  66: 'Pluie avec givre légère',
  67: 'Pluie avec givre dense',
  71: 'Neige légère',
  73: 'Neige modérée',
  75: 'Neige forte',
  77: 'Grains de neige',
  80: 'Bruine légère',
  81: 'Bruine modérée',
  82: 'Bruine forte',
  85: 'Bruine légère',
  86: 'Bruine dense',
  95: 'Orage léger',
  96: 'Orage léger avec petites grêles',
  99: 'Orage fort avec grosses grêles',
}

export const useWeatherGeneral = (params: WeatherParams | null) => {
  return useQuery({
    queryKey: ['weatherGeneral', params?.latitude, params?.longitude],
    queryFn: () => fetchWeatherGeneral(params!),
    enabled: !!params,
  })
}

export const useTemperature = (params: WeatherParams | null) => {
  return useQuery({
    queryKey: ['temperature', params?.latitude, params?.longitude],
    queryFn: () => fetchTemperature(params!),
    enabled: !!params,
  })
}

export const useHumidity = (params: WeatherParams | null) => {
  return useQuery({
    queryKey: ['humidity', params?.latitude, params?.longitude],
    queryFn: () => fetchHumidity(params!),
    enabled: !!params,
  })
}

export const useLightExposure = (params: WeatherParams | null) => {
  return useQuery({
    queryKey: ['lightExposure', params?.latitude, params?.longitude],
    queryFn: () => fetchLightExposure(params!),
    enabled: !!params,
  })
}
