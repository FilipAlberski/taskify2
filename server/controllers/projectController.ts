import User from '../models/userModel';
import Project from '../models/projectModel';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user: mongoose.Document;
}

//(req as RequestWithUser).user

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private

export const getProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await Project.find({ deleted: false });
    res.status(200).json(projects);
  }
);
