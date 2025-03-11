/**
 * Hourly weather measurement units
 */
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

/**
 * Hourly weather measurements
 */
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

/**
 * Weather data entity representing forecast or historical weather information
 * for a specific geographic location
 */
export class Weather {
  /**
   * Creates a new Weather instance
   *
   * @param latitude Geographic latitude in decimal degrees
   * @param longitude Geographic longitude in decimal degrees
   * @param generationtime_ms Time taken to generate the weather data in milliseconds
   * @param utc_offset_seconds UTC offset in seconds for the location's timezone
   * @param timezone IANA timezone identifier
   * @param timezone_abbreviation Timezone abbreviation
   * @param elevation Elevation above sea level in meters
   * @param hourly_units Units for hourly measurements
   * @param hourly Hourly weather data measurements
   */
  constructor(
    public latitude: number,
    public longitude: number,
    public generationtime_ms: number,
    public utc_offset_seconds: number,
    public timezone: string,
    public timezone_abbreviation: string,
    public elevation: number,
    public hourly_units: HourlyUnits,
    public hourly: HourlyData
  ) {}
}
