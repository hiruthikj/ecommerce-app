import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressMiddleware as rTracerMiddleware } from 'cls-rtracer';
import { WinstonLoggerConfig } from './logger.config';
import ReqResLoggerInterceptor from './common/interceptor/request-response-logger.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLoggerConfig(),
  });

  app.use(rTracerMiddleware());
  // TODO: Config to Enable Disable
  app.useGlobalInterceptors(new ReqResLoggerInterceptor());

  const port = Number(process.env.APP_PORT ?? '3000');
  await app.listen(port);

  Logger.log(`Server started! Listening to port: ${port}`, 'Bootstrap');
}

bootstrap();
