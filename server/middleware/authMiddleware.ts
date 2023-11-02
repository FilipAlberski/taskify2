import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import mongoose from 'mongoose';

import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
  user: mongoose.Document;
}

const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    token = (req as RequestWithUser).cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;

        (req as RequestWithUser).user = await User.findById(
          decoded.userId
        ).select('-password');

        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export { protectRoute };
