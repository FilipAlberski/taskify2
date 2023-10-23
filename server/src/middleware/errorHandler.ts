import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import logger from '../utils/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || 'error';
  let message = err.message || 'Internal Server Error';

  // Log the error for debugging purposes
  logger.error(err.message);

  // If the error is an instance of a custom error class, handle it appropriately
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }

  // Send a JSON response with the error details
  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorHandler;
