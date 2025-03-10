import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocation } from '../lib/context/LocationContext'
import { Icon } from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function LocationMarker() {
  const { selectedLocation, setSelectedLocation } = useLocation()

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

  return selectedLocation ? (
    <Marker
      position={[selectedLocation.latitude, selectedLocation.longitude]}
      icon={defaultIcon}></Marker>
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
