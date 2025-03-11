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
    <div className='h-screen w-screen space-y-4 overflow-x-hidden'>
      <nav className='border-b border-border shadow-sm bg-card'>
        <div className='max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <img
              src='/icon.svg'
              alt='Crop Cast Logo'
              className='h-8 w-8'
            />
            <h1 className='text-2xl font-bold text-primary'>Crop Cast</h1>
          </div>
          <div className='flex items-center mt-2 sm:mt-0'>
            <span className='text-sm text-muted-foreground'>Prévisions météorologiques pour l'agriculture</span>
          </div>
        </div>
      </nav>
      <div className='flex justify-center items-center mx-2 sm:mx-4 md:mx-6 lg:mx-20 xl:mx-50'>
        <div className='flex flex-col lg:flex-row h-[calc(100vh-8rem)] w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-10 px-2 sm:px-4 md:px-6'>
          <div className='w-full lg:w-1/3'>
            <Tabs
              defaultValue='Weather'
              className='h-full'
              onValueChange={handleTabChange}>
              <TabsList className='grid grid-cols-2 sm:grid-cols-4 w-full'>
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
          <div className='w-full lg:w-2/3 h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto min-h-[350px]'>
            <Map />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
