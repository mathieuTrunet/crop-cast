import { useTime } from '../lib/context/TimeContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { formatDate } from '../lib/utils'

interface TimeSelectorProps {
  times: string[]
}

export function TimeSelector({ times }: TimeSelectorProps) {
  const { selectedTimeIndex, setSelectedTimeIndex } = useTime()

  if (!times || times.length === 0) {
    return null
  }

  return (
    <div className='space-y-2'>
      <Label htmlFor='time-select'>Sélectionner une date et heure</Label>
      <Select
        value={selectedTimeIndex.toString()}
        onValueChange={value => setSelectedTimeIndex(parseInt(value))}>
        <SelectTrigger
          id='time-select'
          className='w-full'>
          <SelectValue placeholder='Sélectionner une date et heure'>
            {formatDate(times[selectedTimeIndex])}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {times.map((time, index) => (
            <SelectItem
              key={index}
              value={index.toString()}>
              {formatDate(time)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
