import Map from '../components/Map'

function MainPage() {
  return (
    <div className='h-screen w-screen space-y-4'>
      <nav className='bg-gray-100 border-b border-gray-200'>
        <div className='p-4 bg-teal-500 w-64 items-center justify-center'>
          <h1 className='text-2xl font-bold'>Crop Cast</h1>
        </div>
      </nav>
      <div className='flex justify-center items-center mx-48'>
        <div className='h-96 w-96'>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default MainPage
