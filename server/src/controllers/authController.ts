import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import CustomError from '../utils/customError';

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new CustomError(
        'Please provide all required fields',
        400
      );
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      }
    );

    // Set JWT token in a secure cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      throw new CustomError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError('Incorrect email or password', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError('Incorrect email or password', 400);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: rememberMe ? '30d' : '1d',
      }
    );

    // Set JWT token in a secure cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe
        ? 30 * 24 * 60 * 60 * 1000
        : 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      token,
      user,
    });
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Clear the JWT cookie to log the user out
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({
    status: 'success',
  });
};

export default { register, login, logout };
