import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
require('express-async-errors');
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import winston from 'winston';
import { PrismaClient } from '@prisma/client';
// Import middleware and utils
import connectDB from './config/connectDB';
import { errorHandler } from './middleware/errorHandler';
import notFound from './utils/notFound';
import logger from './utils/logger';

//test env
console.log(process.env.TEST_ENV as string);

// Initialize app
const app = express();
const prisma = new PrismaClient();

// Middleware setup
app.use(helmet()); // Set security-related HTTP headers
app.use(compression()); // Compress response bodies

app.use(express.json()); // Parse JSON bodies
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
//connectDB();

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
