import { useLocation } from '../../lib/context/LocationContext'
import { useTime } from '../../lib/context/TimeContext'
import { useLightExposure } from '../../lib/hooks/useWeatherData'
import { useWeather } from '../../lib/context/WeatherContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { TimeSelector } from '../TimeSelector'
import { SunIcon, MoonIcon, Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'

function LightExposureTab() {
  const { selectedLocation } = useLocation()
  const { selectedTimeIndex } = useTime()
  const { setLightExposure } = useWeather()
  const { data: lightExposure, isLoading, error } = useLightExposure(selectedLocation)

  useEffect(() => {
    if (lightExposure) setLightExposure(lightExposure)
  }, [lightExposure, setLightExposure])

  if (!selectedLocation) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-gray-500 text-center'>
          Cliquez sur la carte pour sélectionner un emplacement et afficher les données d'exposition à la lumière
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <Loader2Icon className='h-8 w-8 text-blue-500 animate-spin mr-2' />
        <p>Chargement des données d'exposition à la lumière...</p>
      </div>
    )
  }

  if (error || !lightExposure) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-red-500 text-center'>
          Erreur lors du chargement des données d'exposition à la lumière. Veuillez réessayer.
        </p>
      </div>
    )
  }

  const currentIsDay = lightExposure.is_day[selectedTimeIndex]
  const currentSunshineDuration = lightExposure.sunshine_duration[selectedTimeIndex]

  return (
    <div className='h-full w-full space-y-4 p-2'>
      <Card className='mb-4'>
        <CardContent className='pt-4'>
          <TimeSelector times={lightExposure.time} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Exposition à la lumière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='flex items-center justify-center space-x-2'>
              {currentIsDay === 1 ? (
                <SunIcon className='h-10 w-10 text-yellow-500' />
              ) : (
                <MoonIcon className='h-10 w-10 text-blue-900' />
              )}
              <p className='text-lg font-medium'>{currentIsDay === 1 ? 'Jour' : 'Nuit'}</p>
            </div>

            <div className='flex items-center justify-center space-x-2'>
              <SunIcon className='h-6 w-6 text-yellow-400' />
              <p className='text-md'>
                Durée d'ensoleillement:{' '}
                {currentSunshineDuration !== null ? `${(currentSunshineDuration / 60).toFixed(1)} minutes` : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Prévisions d'exposition à la lumière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {lightExposure.is_day.slice(selectedTimeIndex, selectedTimeIndex + 6).map((isDay, index) => {
              const actualIndex = selectedTimeIndex + index
              if (actualIndex >= lightExposure.is_day.length) return null

              return (
                <div
                  key={actualIndex}
                  className='flex flex-col items-center p-2 border rounded-md'>
                  <p className='text-xs text-gray-500'>
                    {new Date(lightExposure.time[actualIndex]).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      hour: '2-digit',
                    })}
                  </p>
                  {isDay === 1 ? (
                    <SunIcon className='h-6 w-6 text-yellow-500 my-1' />
                  ) : (
                    <MoonIcon className='h-6 w-6 text-blue-900 my-1' />
                  )}
                  <p className='text-xs mt-1'>{isDay === 1 ? 'Jour' : 'Nuit'}</p>
                  <p className='text-xs'>
                    Ensoleillement: {(lightExposure.sunshine_duration[actualIndex] / 60).toFixed(1)} min
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LightExposureTab
