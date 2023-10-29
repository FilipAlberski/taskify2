import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error using winston logger
  logger.error(`Error: ${err.message}, Stack: ${err.stack}`);

  // Send a response to the client
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
};
