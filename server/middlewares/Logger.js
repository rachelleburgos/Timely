/**
 * @file Logger.js
 * @brief Logger utility for application-wide logging.
 *
 * This utility module configures a `winston` logger instance with custom settings for various transports such as file and console.
 * It is designed to handle logging at different levels, manage file sizes, and format log output for readability and consistency.
 * The logger also handles exceptions and can be used with middleware like `morgan` for HTTP request logging.
 *
 * @requires winston - A versatile logging library for Node.js.
 *
 * @var options - Defines the settings for each transport method, setting log levels, file paths, rotation, and formatting.
 * @var logger - The winston logger instance configured with file and console transports.
 * @var stream - A stream object for `morgan` that provides a 'write' function for logging HTTP requests.
 *
 * @module Logger
 * @exports logger - The configured winston logger instance.
 *
 * @example
 * // Import the logger
 * import logger from './logger.js';
 *
 * // Log an informational message
 * logger.info('Informational message');
 *
 * // Log an error message
 * logger.error('Error message');
 */

import winston from 'winston';

// Define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `./logs/app.log`, // path where logs will be saved
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

// Instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// Create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;
