import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import config from 'src/config/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      isGlobal: true,
      cache: false,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
