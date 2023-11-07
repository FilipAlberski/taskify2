import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import logger from '../utils/logger';
import User from '../models/userModel';
import {
  generateRefreshToken,
  generateAccessToken,
} from '../utils/generateToken';

import { Document } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends Request {
  user: {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  };
}

const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      console.log('decoded: ', decoded);
      (req as RequestWithUser).user = await User.findById(
        decoded.userId
      ).select('-password');

      console.log('req.user: ', (req as RequestWithUser).user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
);
