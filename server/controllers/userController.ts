import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import logger from '../utils/logger';

//*@desc    Register a new user
//*@route   POST /api/v1/auth/register
//*@access  Public

const register = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'register route',
  });
});

//*@desc   Login user
//*@route  POST /api/v1/auth/login
//*@access Public

const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'login route',
  });
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
