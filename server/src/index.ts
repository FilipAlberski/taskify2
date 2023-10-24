import dotenv from 'dotenv';
dotenv.config({
  path: '../.env',
}); // Load environment variables from .env file
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import winston from 'winston';
import expressAsyncErrors from 'express-async-errors';
// Import middleware and utils
import connectDB from './utils/connectDB';
import { errorHandler } from './middleware/errorHandler';
import notFound from './utils/notFound';
import logger from './utils/logger';

// Initialize app
const app = express();

// Middleware setup
app.use(helmet()); // Set security-related HTTP headers
app.use(compression()); // Compress response bodies
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined')); // HTTP request logging

// If not in production, log to console too
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Connect to MongoDB
connectDB();

// Sample route to test
app.get('/testLogger', (req: Request, res: Response) => {
  logger.info('Info level log message');
  logger.warn('Warning level log message');
  logger.error('Error level log message');
  res.send('Hello from Express & TypeScript with enhancements!');
});

// Handle 404
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
