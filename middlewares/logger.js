const winston = require('winston');
const expressWinston = require('express-winston');

// const requestLogger = expressWinston.logger({
//   transports: [
//     new winston.transports.File({ filename: './logs/request.log' }),
//   ],
//   format: winston.format.json(),
// });
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/request.log', maxsize: 1000000, maxFiles: 10 }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((debug) => {
      const {
        timestamp, level, message, ...args
      } = debug;

      const reqTime = timestamp.slice(0, 19).replace('T', ' ');
      return `${reqTime} :${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  ),
});

// const errorLogger = expressWinston.errorLogger({
//   transports: [
//     new winston.transports.File({ filename: './logs/error.log' }),
//   ],
//   format: winston.format.json(),
// });

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log', maxsize: 1000000, maxFiles: 10 }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((debug) => {
      const {
        timestamp, level, message, ...args
      } = debug;

      const reqTime = timestamp.slice(0, 19).replace('T', ' ');
      return `${reqTime} :${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  ),
});

module.exports = {
  requestLogger,
  errorLogger,
};
