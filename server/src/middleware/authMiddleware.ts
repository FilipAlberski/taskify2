import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in',
      });
    }

    const decoded: any = await jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (!decoded) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in',
      });
    }

    const currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message:
          'The user belonging to this token does no longer exist',
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export default authMiddleware;
