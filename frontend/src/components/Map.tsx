import { MapContainer, TileLayer, Marker, useMapEvents, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocation, DEFAULT_RADIUS } from '../lib/context/LocationContext'
import { useWeather } from '../lib/context/WeatherContext'
import { useTime } from '../lib/context/TimeContext'
import { Icon } from 'leaflet'
import { useMemo } from 'react'
import mapPin from '/map-pin.svg'

const defaultIcon = new Icon({
  iconUrl: mapPin,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
})

function LocationMarker() {
  const { selectedLocation, setSelectedLocation, selectedTab } = useLocation()
  const { weatherGeneral, temperature, humidity, lightExposure } = useWeather()
  const { selectedTimeIndex } = useTime()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setSelectedLocation({
        latitude: lat,
        longitude: lng,
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      })
    },
  })

  const circleStyle = useMemo(() => {
    const defaultStyle = {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.2,
      weight: 2,
    }

    if (!selectedLocation) return defaultStyle

    //based on weather code
    if (selectedTab === 'weather' && weatherGeneral && weatherGeneral.weather_code) {
      const weatherCode = weatherGeneral.weather_code[selectedTimeIndex]

      // sunny
      if (weatherCode === 0)
        return {
          color: '#f59e0b',
          fillColor: '#f59e0b',
          fillOpacity: 0.2,
          weight: 2,
        }

      // partly cloudy
      if (weatherCode >= 1 && weatherCode <= 3)
        return {
          color: '#9ca3af',
          fillColor: '#9ca3af',
          fillOpacity: 0.2,
          weight: 2,
        }

      // fog
      if (weatherCode >= 45 && weatherCode <= 48)
        return {
          color: '#d1d5db',
          fillColor: '#d1d5db',
          fillOpacity: 0.3,
          weight: 2,
        }

      // rain
      if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82))
        return {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.3,
          weight: 2,
        }

      // snow
      if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86))
        return {
          color: '#e5e7eb',
          fillColor: '#e5e7eb',
          fillOpacity: 0.3,
          weight: 2,
        }

      // thunderstorm
      if (weatherCode >= 95)
        return {
          color: '#f59e0b',
          fillColor: '#f59e0b',
          fillOpacity: 0.3,
          weight: 2,
        }
    }

    // based on temperature
    if (selectedTab === 'temperature' && temperature && temperature.temperature) {
      const temp = temperature.temperature[selectedTimeIndex]

      // hot
      if (temp > 25)
        return {
          color: '#ef4444',
          fillColor: '#ef4444',
          fillOpacity: 0.2,
          weight: 2,
        }

      // warm
      if (temp > 15)
        return {
          color: '#f59e0b',
          fillColor: '#f59e0b',
          fillOpacity: 0.2,
          weight: 2,
        }

      // mild
      if (temp > 5)
        return {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.2,
          weight: 2,
        }

      // cold

      return {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.2,
        weight: 2,
      }
    }

    // based on humidity
    if (selectedTab === 'humidity' && humidity && humidity.relative_humidity) {
      const humidityValue = humidity.relative_humidity[selectedTimeIndex]

      // very humid
      if (humidityValue > 80) {
        return {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.4,
          weight: 2,
        }
      }
      // humid
      if (humidityValue > 60) {
        return {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.3,
          weight: 2,
        }
      }
      // moderate
      if (humidityValue > 40) {
        return {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.2,
          weight: 2,
        }
      }
      // dry

      return {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        weight: 2,
      }
    }

    // based on light exposure
    if (selectedTab === 'light' && lightExposure && lightExposure.is_day) {
      const isDay = lightExposure.is_day[selectedTimeIndex]

      // day
      if (isDay === 1) {
        return {
          color: '#f59e0b',
          fillColor: '#f59e0b',
          fillOpacity: 0.2,
          weight: 2,
        }
      }
      // night

      return {
        color: '#1e3a8a',
        fillColor: '#1e3a8a',
        fillOpacity: 0.2,
        weight: 2,
      }
    }

    return defaultStyle
  }, [selectedTab, weatherGeneral, temperature, humidity, lightExposure, selectedTimeIndex])

  return selectedLocation ? (
    <>
      <Marker
        position={[selectedLocation.latitude, selectedLocation.longitude]}
        icon={defaultIcon}
      />
      <Circle
        center={[selectedLocation.latitude, selectedLocation.longitude]}
        radius={DEFAULT_RADIUS}
        pathOptions={{ stroke: false, ...circleStyle }}></Circle>
    </>
  ) : null
}

function Map() {
  return (
    <div className='bg-white rounded-lg shadow-md h-full w-full overflow-hidden p-4'>
      <MapContainer
        center={[50.26794138218596, 2.682411780880334]}
        zoom={8}
        minZoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com">Esri</a>'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        />
        <TileLayer
          url='https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
          opacity={0.5}
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default Map
