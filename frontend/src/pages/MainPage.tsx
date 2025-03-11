import Map from '../components/Map'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import WeatherDataTab from '../components/tabs-data/WeatherDataTab'
import TemperatureTab from '../components/tabs-data/TemperatureTab'
import HumidityTab from '../components/tabs-data/HumidityTab'
import LightExposureTab from '../components/tabs-data/LightExposureTab'
import { useLocation, DataTab } from '../lib/context/LocationContext'

function MainPage() {
  const { setSelectedTab } = useLocation()

  const handleTabChange = (value: string) => setSelectedTab(value.toLowerCase() as DataTab)

  return (
    <div className='h-screen w-screen space-y-4'>
      <nav className='border-b border-border shadow-sm bg-card'>
        <div className='max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <img
              src='/icon.svg'
              alt='Crop Cast Logo'
              className='h-8 w-8'
            />
            <h1 className='text-2xl font-bold text-primary'>Crop Cast</h1>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-muted-foreground'>Prévisions météorologiques pour l'agriculture</span>
          </div>
        </div>
      </nav>
      <div className='flex justify-center items-center mx-70'>
        <div className='flex flex-row h-[calc(100vh-8rem)] w-full space-x-10 px-6'>
          <div className='w-1/3'>
            <Tabs
              defaultValue='Weather'
              className='h-full'
              onValueChange={handleTabChange}>
              <TabsList className='grid grid-cols-4 w-full'>
                <TabsTrigger value='Weather'>Météo</TabsTrigger>
                <TabsTrigger value='Temperature'>Température</TabsTrigger>
                <TabsTrigger value='Humidity'>Humidité</TabsTrigger>
                <TabsTrigger value='Light'>Lumière</TabsTrigger>
              </TabsList>
              <TabsContent
                value='Weather'
                className='h-[calc(100%-3rem)] overflow-auto'>
                <WeatherDataTab />
              </TabsContent>
              <TabsContent
                value='Temperature'
                className='h-[calc(100%-3rem)] overflow-auto'>
                <TemperatureTab />
              </TabsContent>
              <TabsContent
                value='Humidity'
                className='h-[calc(100%-3rem)] overflow-auto'>
                <HumidityTab />
              </TabsContent>
              <TabsContent
                value='Light'
                className='h-[calc(100%-3rem)] overflow-auto'>
                <LightExposureTab />
              </TabsContent>
            </Tabs>
          </div>
          <div className='w-2/3'>
            <Map />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
