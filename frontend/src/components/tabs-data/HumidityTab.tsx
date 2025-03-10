import { useLocation } from '../../lib/context/LocationContext'
import { useHumidity } from '../../lib/hooks/useWeatherData'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CloudRainIcon, DropletIcon, Loader2Icon } from 'lucide-react'

function HumidityTab() {
  const { selectedLocation } = useLocation()
  const { data: humidity, isLoading, error } = useHumidity(selectedLocation)

  const currentPrecipitation = humidity ? humidity.precipitation[0] : null
  const currentSoilMoisture = humidity ? humidity.soil_moisture[0] : null
  const currentRelativeHumidity = humidity ? humidity.relative_humidity[0] : null
  const currentEvapotranspiration = humidity ? humidity.evapotranspiration[0] : null

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

  return (
    <div className='h-full w-full space-y-4 p-2'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Humidité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <DropletIcon className='h-8 w-8 text-blue-500' />
              <p className='text-sm font-medium'>Humidité relative</p>
              <p className='text-xl font-bold'>
                {currentRelativeHumidity !== null
                  ? `${currentRelativeHumidity.toFixed(0)}${humidity.hourly_units.relative_humidity_2m}`
                  : 'N/A'}
              </p>
            </div>

            <div className='flex flex-col items-center justify-center space-y-2'>
              <CloudRainIcon className='h-8 w-8 text-blue-400' />
              <p className='text-sm font-medium'>Précipitations</p>
              <p className='text-xl font-bold'>
                {currentPrecipitation !== null
                  ? `${currentPrecipitation.toFixed(1)}${humidity.hourly_units.precipitation}`
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className='mt-4 pt-4 border-t grid grid-cols-2 gap-4'>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <DropletIcon className='h-6 w-6 text-brown-500' />
              <p className='text-sm'>Humidité du sol</p>
              <p className='text-md font-medium'>
                {currentSoilMoisture !== null ? `${(currentSoilMoisture * 100).toFixed(1)}%` : 'N/A'}
              </p>
            </div>

            <div className='flex flex-col items-center justify-center space-y-2'>
              <svg
                className='h-6 w-6 text-green-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M18 2a3 3 0 0 0-3 3v14a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z'></path>
                <path d='M6 2a3 3 0 0 1 3 3v14a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z'></path>
                <path d='M6 18H4'></path>
                <path d='M6 14H4'></path>
                <path d='M6 10H4'></path>
                <path d='M6 6H4'></path>
                <path d='M18 18h2'></path>
                <path d='M18 14h2'></path>
                <path d='M18 10h2'></path>
                <path d='M18 6h2'></path>
              </svg>
              <p className='text-sm'>Évapotranspiration</p>
              <p className='text-md font-medium'>
                {currentEvapotranspiration !== null
                  ? `${currentEvapotranspiration.toFixed(2)}${humidity.hourly_units.evapotranspiration}`
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
            {humidity.precipitation.slice(0, 6).map((precip, index) => (
              <div
                key={index}
                className='flex flex-col items-center p-2 border rounded-md'>
                <p className='text-xs text-gray-500'>
                  {new Date(humidity.time[index]).toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    hour: '2-digit',
                  })}
                </p>
                <div className='flex items-center space-x-1 my-1'>
                  <CloudRainIcon className='h-4 w-4 text-blue-400' />
                  <p className='text-sm'>
                    {precip.toFixed(1)}
                    {humidity.hourly_units.precipitation}
                  </p>
                </div>
                <div className='flex items-center space-x-1'>
                  <DropletIcon className='h-3 w-3 text-blue-500' />
                  <p className='text-xs'>
                    {humidity.relative_humidity[index].toFixed(0)}
                    {humidity.hourly_units.relative_humidity_2m}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HumidityTab
