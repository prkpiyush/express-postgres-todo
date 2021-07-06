import { createLogger, transports, format } from 'winston';

const myFormat = format.printf((info) => {
  const { timestamp, level, message, error, stack } = info;
  let log = `[${timestamp}] ${level}: ${message}`;

  if (error) {
    if (error.stack) log = `${log}\n${error.stack}`;
    if (process.env.NODE_ENV !== 'production') log = `${log}\n${JSON.stringify(error, null, 2)}`;
  }

  if (stack) {
    if (stack) log = `${log}\n${stack}`;
    if (process.env.NODE_ENV !== 'production') log = `${log}\n${JSON.stringify(stack, null, 2)}`;
  }

  return log;
});

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
    format.colorize(),
    myFormat
  ),
  transports: process.env.MODE !== 'production' ?
    [
      new transports.Console()
    ] :
    [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ]
});
