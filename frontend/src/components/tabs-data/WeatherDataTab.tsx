import { useLocation } from '../../lib/context/LocationContext'
import { useWeatherGeneral, weatherCodeMap } from '../../lib/hooks/useWeatherData'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  SunIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudFogIcon,
  CloudLightningIcon,
  WindIcon,
  Loader2Icon,
} from 'lucide-react'

function WeatherDataTab() {
  const { selectedLocation } = useLocation()
  const { data: weatherGeneral, isLoading, error } = useWeatherGeneral(selectedLocation)

  const currentWeatherCode = weatherGeneral ? weatherGeneral.weather_code[0] : null
  const currentWindSpeed = weatherGeneral ? weatherGeneral.wind_speed[0] : null

  const getWeatherIcon = (code: number | null) => {
    if (code === null) return <CloudIcon className='h-10 w-10' />

    if (code === 0) return <SunIcon className='h-10 w-10 text-yellow-500' />
    if (code >= 1 && code <= 3) return <CloudIcon className='h-10 w-10 text-gray-500' />
    if (code >= 45 && code <= 48) return <CloudFogIcon className='h-10 w-10 text-gray-400' />
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
      return <CloudRainIcon className='h-10 w-10 text-blue-500' />
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
      return <CloudSnowIcon className='h-10 w-10 text-blue-200' />
    if (code >= 95) return <CloudLightningIcon className='h-10 w-10 text-yellow-400' />

    return <CloudIcon className='h-10 w-10' />
  }

  if (!selectedLocation) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-gray-500 text-center'>
          Cliquez sur la carte pour sélectionner un emplacement et afficher les données météorologiques
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <Loader2Icon className='h-8 w-8 text-blue-500 animate-spin mr-2' />
        <p>Chargement des données météorologiques...</p>
      </div>
    )
  }

  if (error || !weatherGeneral) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-red-500 text-center'>
          Erreur lors du chargement des données météorologiques. Veuillez réessayer.
        </p>
      </div>
    )
  }

  return (
    <div className='h-full w-full space-y-4 p-2'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Météo générale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='flex items-center justify-center space-x-2'>
              {getWeatherIcon(currentWeatherCode)}
              <p className='text-lg font-medium'>
                {currentWeatherCode !== null ? weatherCodeMap[currentWeatherCode] : 'Données non disponibles'}
              </p>
            </div>

            <div className='flex items-center justify-center space-x-2'>
              <WindIcon className='h-6 w-6 text-gray-500' />
              <p className='text-md'>
                Vitesse du vent:{' '}
                {currentWindSpeed !== null
                  ? `${currentWindSpeed.toFixed(1)} ${weatherGeneral.hourly_units.wind_speed_10m}`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Prévisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {weatherGeneral.weather_code.slice(0, 6).map((code, index) => (
              <div
                key={index}
                className='flex flex-col items-center p-2 border rounded-md'>
                <p className='text-xs text-gray-500'>
                  {new Date(weatherGeneral.time[index]).toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    hour: '2-digit',
                  })}
                </p>
                {getWeatherIcon(code)}
                <p className='text-xs mt-1'>{weatherCodeMap[code]}</p>
                <p className='text-xs'>
                  {weatherGeneral.wind_speed[index].toFixed(1)} {weatherGeneral.hourly_units.wind_speed_10m}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeatherDataTab
