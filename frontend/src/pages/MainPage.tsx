import Map from '../components/Map'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import WeatherDataTab from '../components/tabs-data/WeatherDataTab'
import TemperatureTab from '../components/tabs-data/TemperatureTab'
import HumidityTab from '../components/tabs-data/HumidityTab'
import LightExposureTab from '../components/tabs-data/LightExposureTab'

function MainPage() {
  return (
    <div className='h-screen w-screen space-y-4'>
      <nav className='border-b border-gray-200 border-shadow-sm'>
        <div className='p-4 bg-teal-500 w-64 items-center justify-center border-gray-200 border-shadow-sm'>
          <h1 className='text-2xl font-bold text-white'>Crop Cast</h1>
        </div>
      </nav>
      <div className='flex justify-center items-center mx-70'>
        <div className='flex flex-row h-[calc(100vh-8rem)] w-full space-x-10 px-6'>
          <div className='w-1/3'>
            <Tabs
              defaultValue='Weather'
              className='h-full'>
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
