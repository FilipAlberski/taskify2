import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
require('express-async-errors');
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import winston from 'winston';
import cookieParser from 'cookie-parser';
import firstStart from './utils/firstStart';

// Import middleware and utils
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import notFound from './utils/notFound';
import logger from './utils/logger';

//routes import
import authRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';

//connect to db
connectDB().then(() => {
  logger.info('DB connected');
  firstStart();
});

//test env
if (process.env.TEST_ENV !== 'test') {
  logger.error('dotenv is not working');
}

// Initialize app
const app = express();

// Middleware setup
app.use(helmet()); // Set security-related HTTP headers
app.use(compression()); // Compress response bodies

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('tiny')); // HTTP request logging

// If not in production, log to console too

// Sample route to test
app.get('/testLogger', (req: Request, res: Response) => {
  logger.info('Info level log message');
  logger.warn('Warning level log message');
  logger.error('Error level log message');
  res.send('Hello from Express & TypeScript with enhancements!');
});
//error test

app.get('/errorTest', (req: Request, res: Response) => {
  throw new Error('This is a test error');
});
//routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);

// Handle 404
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
