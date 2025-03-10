import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

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
      </MapContainer>
    </div>
  )
}

export default Map
