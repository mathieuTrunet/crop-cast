import { IsNumber, IsLatitude, IsLongitude } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class GetWeatherDto {
  @IsLatitude()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseFloat(value))
  latitude: number

  @IsLongitude()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseFloat(value))
  longitude: number
}
