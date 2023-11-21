import User from '../models/userModel';
import Project from '../models/projectModel';
import generateToken from './generateToken';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import logger from './logger';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

const firstStart = async () => {
  const user = await User.findOne({ userName: 'admin' });

  if (!user) {
    const admin = await User.create({
      firstName: 'admin',
      lastName: 'admin',
      userName: 'admin',
      email: 'to@change.com',
      password: 'admin',
      role: 'admin',
    });
  }

  const project = await Project.findOne({ name: 'Main Project' });

  if (!project) {
    const admin = await Project.create({
      name: 'Main Project',
      description: 'Main Project',
      shortName: 'MAIN',
      creator: user?._id,
      admins: [user?._id],
      members: [user?._id],
    });
  }

  logger.info('First start done');
};

export default firstStart;
