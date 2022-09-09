const winston = require('winston');
const path = require('path');
const { combine, timestamp, printf, colorize, align, json } = winston.format;

require("dotenv").config();

const errorFilter = winston.format((info, opts) => {
 return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
 return info.level === 'info' ? info : false;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
    filename: path.join(__dirname, './app-info.log'),
    level: 'info',
    format: combine(infoFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, './app-error.log'),
      level: 'error',
      format: combine(errorFilter(), timestamp(), json()),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, './app-exception.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "./app-exception.log"),
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = { logger };