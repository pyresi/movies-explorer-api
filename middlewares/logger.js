const winston = require('winston');
const expressWinston = require('express-winston');
const { REQUEST_LOG_FILE, ERROR_LOG_FILE } = require('../util/constants');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: REQUEST_LOG_FILE }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERROR_LOG_FILE }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};