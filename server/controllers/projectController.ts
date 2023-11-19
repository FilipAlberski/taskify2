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

// @desc    Create new project
// @route   POST /api/v1/projects
// @access  Private

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, shortName, admin, members } = req.body;

    const project = new Project({
      name,
      description,
      shortName,
      creator: (req as RequestWithUser).user._id,
      admins: [admin],
      members: [admin, ...members],
    });

    const createdProject = await project.save();

    if (!createdProject) {
      res.status(400);
      throw new Error('Invalid project data');
    }

    res.status(201).json(createdProject);
  }
);

// @desc    Get project by ID
// @route   GET /api/v1/projects/:id
// @access  Private

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);

    if (
      project?.members.includes((req as RequestWithUser).user._id)
    ) {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404);
        throw new Error('Project not found');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized');
    }
  }
);
