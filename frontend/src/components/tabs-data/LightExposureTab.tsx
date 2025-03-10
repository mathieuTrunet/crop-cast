import { useLocation } from '../../lib/context/LocationContext'
import { useLightExposure } from '../../lib/hooks/useWeatherData'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { SunIcon, MoonIcon, Loader2Icon } from 'lucide-react'

function LightExposureTab() {
  const { selectedLocation } = useLocation()
  const { data: lightExposure, isLoading, error } = useLightExposure(selectedLocation)

  const currentIsDay = lightExposure ? lightExposure.is_day[0] : null
  const currentSunshineDuration = lightExposure ? lightExposure.sunshine_duration[0] : null

  if (!selectedLocation) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-gray-500 text-center'>
          Cliquez sur la carte pour sélectionner un emplacement et afficher les données d'exposition lumineuse
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <Loader2Icon className='h-8 w-8 text-blue-500 animate-spin mr-2' />
        <p>Chargement des données d'exposition lumineuse...</p>
      </div>
    )
  }

  if (error || !lightExposure) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-red-500 text-center'>
          Erreur lors du chargement des données d'exposition lumineuse. Veuillez réessayer.
        </p>
      </div>
    )
  }

  return (
    <div className='h-full w-full space-y-4 p-2'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Exposition lumineuse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='flex items-center justify-center space-x-2'>
              {currentIsDay ? (
                <SunIcon className='h-10 w-10 text-yellow-500' />
              ) : (
                <MoonIcon className='h-10 w-10 text-blue-900' />
              )}
              <p className='text-xl font-bold'>{currentIsDay ? 'Jour' : 'Nuit'}</p>
            </div>

            <div className='flex flex-col items-center justify-center space-y-2'>
              <p className='text-md'>
                Durée d'ensoleillement actuelle:{' '}
                {currentSunshineDuration !== null
                  ? `${currentSunshineDuration.toFixed(0)} ${lightExposure.hourly_units.sunshine_duration}`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Prévisions d'ensoleillement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {lightExposure.is_day.slice(0, 6).map((isDay, index) => (
              <div
                key={index}
                className='flex flex-col items-center p-2 border rounded-md'>
                <p className='text-xs text-gray-500'>
                  {new Date(lightExposure.time[index]).toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    hour: '2-digit',
                  })}
                </p>
                {isDay ? (
                  <SunIcon className='h-6 w-6 text-yellow-500 my-1' />
                ) : (
                  <MoonIcon className='h-6 w-6 text-blue-900 my-1' />
                )}
                <p className='text-xs'>
                  {lightExposure.sunshine_duration[index].toFixed(0)}{' '}
                  {lightExposure.hourly_units.sunshine_duration}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Heures de lever/coucher du soleil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-around items-center p-4'>
            <div className='flex flex-col items-center'>
              <SunIcon className='h-8 w-8 text-yellow-500 mb-2' />
              <p className='text-sm font-medium'>Lever du soleil</p>
              <p className='text-lg'>06:30</p>
            </div>
            <div className='h-20 border-l border-gray-300'></div>
            <div className='flex flex-col items-center'>
              <MoonIcon className='h-8 w-8 text-blue-900 mb-2' />
              <p className='text-sm font-medium'>Coucher du soleil</p>
              <p className='text-lg'>20:15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LightExposureTab
