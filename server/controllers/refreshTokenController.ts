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
    const cookies = req.cookies;

    if (!cookies.refreshToken) {
      res.status(401);
      throw new Error('Not authorized, no token, login again');
    }
    const refreshToken = cookies.refreshToken;

    res.clearCookie('accessToken');

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const user = await User.findById(decoded.userId).exec();

    if (!user) {
      res.status(401);
      throw new Error('Not authorized, no user found');
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!,
      (err: any, user: any) => {
        if (err) {
          res.status(401);
          throw new Error('Not authorized, token failed');
        }

        generateAccessToken(res, user);
      }
    );

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    });
  }
);

export { refreshToken };
