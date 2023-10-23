import { Request, Response, NextFunction } from 'express';

const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default errorHandler;
