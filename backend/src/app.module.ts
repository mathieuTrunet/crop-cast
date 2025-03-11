import { Module } from '@nestjs/common'
import { WeatherModule } from './weather/weather.module'
import { CacheModule } from '@nestjs/cache-manager'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
const CACHE_TTL_IN_MILLISECONDS = 1000 * 60 * 20 // 20 minutes

const cacheModule = CacheModule.register({ isGlobal: true, ttl: CACHE_TTL_IN_MILLISECONDS })

@Module({
  imports: [
    WeatherModule,
    cacheModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
  ],
})
export class AppModule {}
