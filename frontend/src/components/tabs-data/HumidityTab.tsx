import { useLocation } from '../../lib/context/LocationContext'
import { useTime } from '../../lib/context/TimeContext'
import { useHumidity } from '../../lib/hooks/useWeatherData'
import { useWeather } from '../../lib/context/WeatherContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { TimeSelector } from '../TimeSelector'
import { DropletIcon, CloudRainIcon, Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'

function HumidityTab() {
  const { selectedLocation } = useLocation()
  const { selectedTimeIndex } = useTime()
  const { setHumidity } = useWeather()
  const { data: humidity, isLoading, error } = useHumidity(selectedLocation)

  useEffect(() => {
    if (humidity) setHumidity(humidity)
  }, [humidity, setHumidity])

  if (!selectedLocation) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-gray-500 text-center'>
          Cliquez sur la carte pour sélectionner un emplacement et afficher les données d'humidité
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <Loader2Icon className='h-8 w-8 text-blue-500 animate-spin mr-2' />
        <p>Chargement des données d'humidité...</p>
      </div>
    )
  }

  if (error || !humidity) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-red-500 text-center'>
          Erreur lors du chargement des données d'humidité. Veuillez réessayer.
        </p>
      </div>
    )
  }

  const currentHumidity = humidity.relative_humidity[selectedTimeIndex]
  const currentPrecipitation = humidity.precipitation[selectedTimeIndex]
  const currentSoilMoisture = humidity.soil_moisture[selectedTimeIndex]
  const currentEvapotranspiration = humidity.evapotranspiration[selectedTimeIndex]

  return (
    <div className='h-full w-full space-y-4 p-2'>
      <Card className='mb-4'>
        <CardContent className='pt-4'>
          <TimeSelector times={humidity.time} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Humidité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='flex items-center justify-center space-x-2'>
              <DropletIcon className='h-10 w-10 text-blue-500' />
              <p className='text-2xl font-bold'>
                {currentHumidity !== null
                  ? `${currentHumidity.toFixed(0)}${humidity.hourly_units.relative_humidity_2m}`
                  : 'N/A'}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 w-full'>
              <div className='flex items-center space-x-2'>
                <CloudRainIcon className='h-6 w-6 text-blue-400' />
                <p className='text-sm'>
                  Précipitations:{' '}
                  {currentPrecipitation !== null
                    ? `${currentPrecipitation.toFixed(1)}${humidity.hourly_units.precipitation}`
                    : 'N/A'}
                </p>
              </div>

              <div className='flex items-center space-x-2'>
                <DropletIcon className='h-6 w-6 text-brown-500' />
                <p className='text-sm'>
                  Humidité du sol:{' '}
                  {currentSoilMoisture !== null ? `${(currentSoilMoisture * 100).toFixed(1)}%` : 'N/A'}
                </p>
              </div>

              <div className='flex items-center space-x-2 col-span-2'>
                <DropletIcon className='h-6 w-6 text-green-500' />
                <p className='text-sm'>
                  Évapotranspiration:{' '}
                  {currentEvapotranspiration !== null
                    ? `${currentEvapotranspiration.toFixed(2)}${humidity.hourly_units.evapotranspiration}`
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Prévisions d'humidité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {humidity.relative_humidity.slice(selectedTimeIndex, selectedTimeIndex + 6).map((hum, index) => {
              const actualIndex = selectedTimeIndex + index
              if (actualIndex >= humidity.relative_humidity.length) return null

              return (
                <div
                  key={actualIndex}
                  className='flex flex-col items-center p-2 border rounded-md'>
                  <p className='text-xs text-gray-500'>
                    {new Date(humidity.time[actualIndex]).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      hour: '2-digit',
                    })}
                  </p>
                  <div className='flex items-center space-x-1 my-1'>
                    <DropletIcon className='h-4 w-4 text-blue-500' />
                    <p className='text-sm font-medium'>{hum.toFixed(0)}%</p>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <CloudRainIcon className='h-3 w-3 text-blue-400' />
                    <p className='text-xs'>
                      {humidity.precipitation[actualIndex].toFixed(1)}
                      {humidity.hourly_units.precipitation}
                    </p>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <DropletIcon className='h-3 w-3 text-brown-500' />
                    <p className='text-xs'>Sol: {(humidity.soil_moisture[actualIndex] * 100).toFixed(1)}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HumidityTab
