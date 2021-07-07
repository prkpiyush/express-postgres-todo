import { createLogger, transports, format } from 'winston';

const myFormat = format.printf((info) => {
  const { timestamp, level, message, error, stack } = info;
  let log = `[${timestamp}] ${level}: ${message}`;

  if (error) {
    if (error.stack) log = `${log}\n${error.stack}`;
  }

  if (stack) {
    log = `${log}\n${stack}`;
  }

  return log;
});

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
    myFormat
  ),
  transports: process.env.MODE !== 'production' ?
    [
      new transports.Console()
    ] :
    [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/info.log' }),
    ]
});

export const stream = {
  write: function (message: string) {
    logger.info(message.trim());
  }
};
