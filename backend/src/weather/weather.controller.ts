import { Controller, Get, Query } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { GetWeatherDto } from './dto/read-weather.dto'
import { Weather } from './entities/weather.entity'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeatherData(@Query() getWeatherDto: GetWeatherDto ): Promise<Weather> {
    return this.weatherService.getWeatherData(getWeatherDto.latitude, getWeatherDto.longitude)
  }
}
  