import { useLocation } from '../../lib/context/LocationContext'
import { useTime } from '../../lib/context/TimeContext'
import { useTemperature } from '../../lib/hooks/useWeatherData'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { TimeSelector } from '../TimeSelector'
import { ThermometerIcon, Loader2Icon } from 'lucide-react'

function TemperatureTab() {
  const { selectedLocation } = useLocation()
  const { selectedTimeIndex } = useTime()
  const { data: temperature, isLoading, error } = useTemperature(selectedLocation)

  if (!selectedLocation) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-gray-500 text-center'>
          Cliquez sur la carte pour sélectionner un emplacement et afficher les données de température
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <Loader2Icon className='h-8 w-8 text-blue-500 animate-spin mr-2' />
        <p>Chargement des données de température...</p>
      </div>
    )
  }

  if (error || !temperature) {
    return (
      <div className='h-full w-full flex items-center justify-center p-4'>
        <p className='text-red-500 text-center'>
          Erreur lors du chargement des données de température. Veuillez réessayer.
        </p>
      </div>
    )
  }

  const currentTemperature = temperature.temperature[selectedTimeIndex]
  const currentSoilTemperature = temperature.soil_temperature[selectedTimeIndex]

  return (
    <div className='h-full w-full space-y-4 p-2'>
      <Card className='mb-4'>
        <CardContent className='pt-4'>
          <TimeSelector times={temperature.time} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Température</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='flex items-center justify-center space-x-2'>
              <ThermometerIcon className='h-10 w-10 text-red-500' />
              <p className='text-2xl font-bold'>
                {currentTemperature !== null
                  ? `${currentTemperature.toFixed(1)}${temperature.hourly_units.temperature_2m}`
                  : 'N/A'}
              </p>
            </div>

            <div className='flex items-center justify-center space-x-2'>
              <ThermometerIcon className='h-6 w-6 text-brown-500' />
              <p className='text-md'>
                Température du sol:{' '}
                {currentSoilTemperature !== null
                  ? `${currentSoilTemperature.toFixed(1)}${temperature.hourly_units.soil_temperature_0cm}`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Prévisions de température</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {temperature.temperature.slice(selectedTimeIndex, selectedTimeIndex + 6).map((temp, index) => {
              const actualIndex = selectedTimeIndex + index
              if (actualIndex >= temperature.temperature.length) return null

              return (
                <div
                  key={actualIndex}
                  className='flex flex-col items-center p-2 border rounded-md'>
                  <p className='text-xs text-gray-500'>
                    {new Date(temperature.time[actualIndex]).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      hour: '2-digit',
                    })}
                  </p>
                  <div className='flex items-center space-x-1 my-1'>
                    <ThermometerIcon className='h-4 w-4 text-red-500' />
                    <p className='text-sm font-medium'>
                      {temp.toFixed(1)}
                      {temperature.hourly_units.temperature_2m}
                    </p>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ThermometerIcon className='h-3 w-3 text-brown-500' />
                    <p className='text-xs'>
                      Sol: {temperature.soil_temperature[actualIndex].toFixed(1)}
                      {temperature.hourly_units.soil_temperature_0cm}
                    </p>
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

export default TemperatureTab
