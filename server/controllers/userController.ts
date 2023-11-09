import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import logger from '../utils/logger';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import jwt from 'jsonwebtoken';

import { Document } from 'mongoose';

interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

interface RequestWithUser extends Request {
  user: {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  };
}

//*@desc    Register a new user
//*@route   POST /api/v1/auth/register
//*@access  Public

const register = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, userName, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }

  const userNameExist = await User.findOne({ userName });

  if (userNameExist) {
    res.status(400);
    throw new Error('User name already exist');
  }

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//*@desc   Login user
//*@route  POST /api/v1/auth/login
//*@access Public

const login = asyncHandler(async (req: Request, res: Response) => {
  const { password, email } = req.body;
  console.log(req.body);

  const user = (await User.findOne({ email })) as IUser;

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid user name or password');
  }
});

//*@desc   Auth user using cookie
//*@route  GET /api/v1/auth/cookie
//*@access Public

const checkAuth = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    console.log('cookies: ', req.cookies);
    if (!refreshToken) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    const user = (await User.findById(decoded.userId)) as IUser;

    if (!user) {
      res.status(401);
      throw new Error('Not authorized, no user');
    }

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    });
  }
);

//*@desc   Logout user
//*@route  GET /api/v1/auth/logout
//*@access Private

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: 'user logged out',
  });
});

//*@desc   Get user profile
//*@route  GET /api/v1/auth/profile
//*@access Private

const getProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = {
      _id: (req as RequestWithUser).user._id,
      firstName: (req as RequestWithUser).user.firstName,
      lastName: (req as RequestWithUser).user.lastName,
      userName: (req as RequestWithUser).user.userName,
      email: (req as RequestWithUser).user.email,
    };

    res.status(200).json(user);
  }
);

//*@desc   Update user profile
//*@route  PUT /api/v1/auth/profile
//@access Private

const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (await User.findById(
      (req as RequestWithUser).user._id
    )) as IUser;

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.userName = req.body.userName || user.userName;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userName: updatedUser.userName,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);

export {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  checkAuth,
};
