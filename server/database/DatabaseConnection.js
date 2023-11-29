/**
 * @file DatabaseConnection.js
 * @brief Utility for connecting to a MongoDB database using Mongoose.
 *
 * This file exports a function `connectDatabase` that establishes a connection to a MongoDB database using the Mongoose ODM.
 * It takes a URI string as a parameter and attempts to connect to the database. Upon successful connection, it logs a success message.
 * In case of failure, it logs an error message and exits the process. This utility is essential for initializing the database connection
 * at the start of the application.
 *
 * @requires mongoose - For MongoDB interactions through Mongoose.
 *
 * @function connectDatabase
 * @param {String} uri - The URI string for the MongoDB database.
 * @description Connects to the MongoDB database using the provided URI. Logs the status of the connection attempt.
 *              Exits the process on failure to establish a connection.
 *
 * @example
 * // Usage in an application's entry point (e.g., server.js)
 * import { connectDatabase } from './DatabaseConnection.js';
 * const databaseUri = 'mongodb://localhost:27017/myapp';
 * connectDatabase(databaseUri);
 */

import mongoose from 'mongoose';

export const connectDatabase = async uri => {
  try {
    await mongoose.connect(uri, {});
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};
