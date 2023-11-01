import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import logger from '../utils/logger';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

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
  const { userName, password, email } = req.body;

  const user = (await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  })) as IUser;

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

//*@desc   Logout user
//*@route  GET /api/v1/auth/logout
//*@access Private

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'logout route',
  });
});

//*@desc   Get user profile
//*@route  GET /api/v1/auth/profile
//*@access Private

const getProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'get profile route',
    });
  }
);

//*@desc   Update user profile
//*@route  PUT /api/v1/auth/profile
//@access Private

const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'update profile route',
    });
  }
);

export { register, login, logout, getProfile, updateProfile };
