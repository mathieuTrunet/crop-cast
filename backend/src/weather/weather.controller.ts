import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { GetWeatherDto } from './dto/read-weather.dto'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeatherData(@Query(new ValidationPipe({ transform: true })) getWeatherDto: GetWeatherDto) {
    return this.weatherService.getWeatherData(getWeatherDto.latitude, getWeatherDto.longitude)
  }

  @Get('general')
  getWeatherGeneral(@Query(new ValidationPipe({ transform: true })) getWeatherDto: GetWeatherDto) {
    return this.weatherService.getWeatherGeneral(getWeatherDto.latitude, getWeatherDto.longitude)
  }

  @Get('temperature')
  getTemperature(@Query(new ValidationPipe({ transform: true })) getWeatherDto: GetWeatherDto) {
    return this.weatherService.getTemperature(getWeatherDto.latitude, getWeatherDto.longitude)
  }

  @Get('humidity')
  getHumidity(@Query(new ValidationPipe({ transform: true })) getWeatherDto: GetWeatherDto) {
    return this.weatherService.getHumidity(getWeatherDto.latitude, getWeatherDto.longitude)
  }

  @Get('light-exposure')
  getLightExposure(@Query(new ValidationPipe({ transform: true })) getWeatherDto: GetWeatherDto) {
    return this.weatherService.getLightExposure(getWeatherDto.latitude, getWeatherDto.longitude)
  }
}
