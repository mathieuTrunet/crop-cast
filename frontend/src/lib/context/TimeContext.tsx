import { createContext, useContext, useState, ReactNode } from 'react'

interface TimeContextType {
  selectedTimeIndex: number
  setSelectedTimeIndex: (index: number) => void
}

const TimeContext = createContext<TimeContextType | undefined>(undefined)

export function TimeProvider({ children }: { children: ReactNode }) {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0)

  return (
    <TimeContext.Provider value={{ selectedTimeIndex, setSelectedTimeIndex }}>{children}</TimeContext.Provider>
  )
}

export function useTime() {
  const context = useContext(TimeContext)
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider')
  }
  return context
}
