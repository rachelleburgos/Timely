/**
 * @file ErrorHandler.js
 * @brief Middleware for enhanced error handling in an Express application.
 *
 * This file exports the `errorHandler` middleware function. It handles errors that occur during the request processing in an Express
 * application. The function logs detailed error information (including the stack trace) in development mode for easier debugging.
 * In production, it provides a generic error message to the client for security reasons.
 *
 * @requires Logger.js - Logger utility for logging errors.
 *
 * @middleware
 * @function errorHandler
 * @param {Object} err - The error object that has been thrown.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express middleware chain.
 * @description Processes and formats errors based on the environment, providing detailed information in development and
 *              generic messages in production. It standardizes error responses across the application.
 *
 * @example
 * // Usage in an Express.js application
 * import { errorHandler } from './ErrorHandler.js';
 * // Other imports and route definitions
 * app.use(errorHandler); // Use errorHandler as the last middleware
 */

import logger from './Logger.js'; // An example logger utility you might implement

export const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const statusCode = err.statusCode || 500;
  const correlationId = req.correlationId || 'N/A'; // Assuming you have a mechanism to set this

  // Standardize error shape
  const errorResponse = {
    message: isDevelopment ? err.message : 'An unexpected error occurred',
    ...(isDevelopment && { stack: err.stack }), // Include stack trace in development mode
    correlationId, // Include the correlation ID for tracing the request
  };

  // Detailed logging for development or use a structured logger for production
  if (isDevelopment) {
    console.error('Error:', err);
  } else {
    // In production, log the error with a logging utility
    logger.error({
      message: err.message,
      stack: err.stack,
      correlationId,
      path: req.path,
      method: req.method,
    });
  }

  // Send the error response
  res.status(statusCode).send({ error: errorResponse });
};
