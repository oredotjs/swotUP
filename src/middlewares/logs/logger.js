const winston = require('winston');
const path = require('path');

const { combine, timestamp, printf, colorize, align } = winston.format;
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
  transports: [new winston.transports.File({
   filename: path.join()
  })],
});
