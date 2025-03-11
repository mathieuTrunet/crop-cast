import { HttpService } from '@nestjs/axios'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Weather } from './entities/weather.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

const REQUEST_TIMEOUT_IN_MILLISECONDS = 5000 // 5 seconds

const API_ENDPOINT_URL = 'https://api.open-meteo.com/v1/forecast'

const API_QUERY_PARAMS = {
  hourly:
    'temperature_2m,relative_humidity_2m,precipitation,weather_code,evapotranspiration,wind_speed_10m,soil_temperature_0cm,soil_moisture_0_to_1cm,is_day,sunshine_duration',
  temporal_resolution: 'hourly_3',
  forecast_days: '14',
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getWeatherData(latitude: number, longitude: number): Promise<Weather> {
    const weather = await this.cacheManager.get<Weather>(`weather_${latitude}_${longitude}`)

    if (weather) return weather

    const response = await firstValueFrom(
      this.httpService.get<Weather>(API_ENDPOINT_URL, {
        params: { ...API_QUERY_PARAMS, latitude, longitude },
        timeout: REQUEST_TIMEOUT_IN_MILLISECONDS,
      })
    )

    if (response.status !== 200)
      throw new HttpException(`Weather API error: ${response.statusText || 'Unknown error'}`, response.status)

    await this.cacheManager.set(`weather_${latitude}_${longitude}`, response.data)

    return response.data
  }

  async getWeatherGeneral(latitude: number, longitude: number) {
    const weatherData = await this.getWeatherData(latitude, longitude)

    const weatherGeneral = {
      hourly_units: weatherData.hourly_units,
      time: weatherData.hourly.time,
      weather_code: weatherData.hourly.weather_code,
      wind_speed: weatherData.hourly.wind_speed_10m,
    }

    return weatherGeneral
  }

  async getTemperature(latitude: number, longitude: number) {
    const weatherData = await this.getWeatherData(latitude, longitude)

    const temperature = {
      hourly_units: weatherData.hourly_units,
      time: weatherData.hourly.time,
      temperature: weatherData.hourly.temperature_2m,
      soil_temperature: weatherData.hourly.soil_temperature_0cm,
    }

    return temperature
  }

  async getHumidity(latitude: number, longitude: number) {
    const weatherData = await this.getWeatherData(latitude, longitude)

    const humidity = {
      hourly_units: weatherData.hourly_units,
      time: weatherData.hourly.time,
      precipitation: weatherData.hourly.precipitation,
      soil_moisture: weatherData.hourly.soil_moisture_0_to_1cm,
      relative_humidity: weatherData.hourly.relative_humidity_2m,
      evapotranspiration: weatherData.hourly.evapotranspiration,
    }

    return humidity
  }

  async getLightExposure(latitude: number, longitude: number) {
    const weatherData = await this.getWeatherData(latitude, longitude)

    const lightExposure = {
      hourly_units: weatherData.hourly_units,
      time: weatherData.hourly.time,
      is_day: weatherData.hourly.is_day,
      sunshine_duration: weatherData.hourly.sunshine_duration,
    }

    return lightExposure
  }
}
