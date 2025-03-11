import { createContext, useContext, useState, ReactNode } from 'react'
import { Location } from '../types'

export const DEFAULT_RADIUS = 5000

export type DataTab = 'weather' | 'temperature' | 'humidity' | 'light'

interface LocationContextType {
  selectedLocation: Location | null
  setSelectedLocation: (location: Location | null) => void
  selectedTab: DataTab
  setSelectedTab: (tab: DataTab) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedTab, setSelectedTab] = useState<DataTab>('weather')

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation, selectedTab, setSelectedTab }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
