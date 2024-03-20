import { id as rTracerId } from 'cls-rtracer';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const WinstonLoggerConfig = () =>
  WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
          }),
          winston.format.printf((info) => {
            const rid = rTracerId();
            return rid
              ? `${info.level} ${info.timestamp} [${info.context}] (req-id:${rid}): ${info.message}`
              : `${info.level} ${info.timestamp} [${info.context}] ${info.message}`;
          }),
        ),
      }),
    ],
  });
