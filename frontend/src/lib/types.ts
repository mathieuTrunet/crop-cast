export interface HourlyUnits {
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  precipitation: string
  weather_code: string
  evapotranspiration: string
  wind_speed_10m: string
  soil_temperature_0cm: string
  soil_moisture_0_to_1cm: string
  is_day: string
  sunshine_duration: string
}

export interface HourlyData {
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  precipitation: number[]
  weather_code: number[]
  evapotranspiration: number[]
  wind_speed_10m: number[]
  soil_temperature_0cm: number[]
  soil_moisture_0_to_1cm: number[]
  is_day: number[]
  sunshine_duration: number[]
}

export interface Weather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: HourlyData
}

export interface WeatherGeneral {
  hourly_units: Pick<HourlyUnits, 'time' | 'weather_code' | 'wind_speed_10m'>
  time: string[]
  weather_code: number[]
  wind_speed: number[]
}

export interface Temperature {
  hourly_units: Pick<HourlyUnits, 'time' | 'temperature_2m' | 'soil_temperature_0cm'>
  time: string[]
  temperature: number[]
  soil_temperature: number[]
}

export interface Humidity {
  hourly_units: Pick<
    HourlyUnits,
    'time' | 'precipitation' | 'soil_moisture_0_to_1cm' | 'relative_humidity_2m' | 'evapotranspiration'
  >
  time: string[]
  precipitation: number[]
  soil_moisture: number[]
  relative_humidity: number[]
  evapotranspiration: number[]
}

export interface LightExposure {
  hourly_units: Pick<HourlyUnits, 'time' | 'is_day' | 'sunshine_duration'>
  time: string[]
  is_day: number[]
  sunshine_duration: number[]
}

export interface Location {
  latitude: number
  longitude: number
  name?: string
}
