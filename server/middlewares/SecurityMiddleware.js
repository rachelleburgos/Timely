/**
 * @file SecurityMiddleware.js
 * @brief Configuration of security-related middleware for an Express.js application.
 *
 * This file exports the `applySecurityMiddleware` function, which is responsible for adding security-related middleware
 * to an Express.js application. It uses the 'helmet' package to set various HTTP headers for security, and the 'cors' package
 * to enable Cross-Origin Resource Sharing (CORS) with customizable options.
 *
 * @requires helmet - Middleware for setting various HTTP headers for security.
 * @requires cors - Middleware to enable CORS (Cross-Origin Resource Sharing).
 *
 * @function applySecurityMiddleware
 * @param {Object} app - The Express application instance.
 * @description Adds helmet and cors middleware to the Express application for enhanced security and CORS configuration.
 *              The CORS configuration can be adjusted based on environment variables or specific deployment needs.
 *
 * @example
 * // Usage in an Express.js application setup
 * import { applySecurityMiddleware } from './SecurityMiddleware.js';
 * const app = express();
 * applySecurityMiddleware(app); // Applying security configurations
 */

import helmet from 'helmet';
import cors from 'cors';

export const applySecurityMiddleware = app => {
  // Security-related HTTP headers
  app.use(helmet());

  // Allow cross-origin requests with CORS configuration
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // TODO: Replace '*' with your domain in production
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
};
