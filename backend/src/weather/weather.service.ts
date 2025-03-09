import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Weather } from './entities/weather.entity'

const API_ENDPOINT_URL = 'https://api.open-meteo.com/v1/forecast'

const API_QUERY_PARAMS = {
  hourly:
    'temperature_2m,relative_humidity_2m,precipitation,weather_code,evapotranspiration,wind_speed_10m,soil_temperature_0cm,soil_moisture_0_to_1cm,is_day,sunshine_duration',
  temporal_resolution: 'hourly_3',
  forecast_days: '14',
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  getWeather(latitude: number, longitude: number) {}

  getTemperature(latitude: number, longitude: number) {}

  getHumidity(latitude: number, longitude: number) {}

  getLightExposure(latitude: number, longitude: number) {}

  async getWeatherData(latitude: number, longitude: number): Promise<Weather> {
    const response = await firstValueFrom(
      this.httpService.get<Weather>(API_ENDPOINT_URL, { params: { ...API_QUERY_PARAMS, latitude, longitude } })
    )

    if (response.status !== 200) throw new Error(`Weather API error: ${response.statusText || 'Unknown error'}`)

    return response.data
  }
}
