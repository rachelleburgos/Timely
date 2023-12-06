import logger from './Logger.js'

export const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const statusCode = err.statusCode || 500
  const correlationId = req.correlationId || 'N/A' // Assuming you have a mechanism to set this

  // Standardize error shape
  const errorResponse = {
    message: isDevelopment ? err.message : 'An unexpected error occurred',
    ...(isDevelopment && { stack: err.stack }), // Include stack trace in development mode
    correlationId // Include the correlation ID for tracing the request
  }

  // Detailed logging for development or use a structured logger for production
  if (isDevelopment) {
    console.error('Error:', err)
  } else {
    // In production, log the error with a logging utility
    logger.error({
      message: err.message,
      stack: err.stack,
      correlationId,
      path: req.path,
      method: req.method
    })
  }

  // Send the error response
  res.status(statusCode).send({ error: errorResponse })
}
