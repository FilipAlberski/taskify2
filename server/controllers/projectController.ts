import User from '../models/userModel';
import Project from '../models/projectModel';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import { Request, Response } from 'express';

interface UserWithThings extends mongoose.Document {
  role: string;
}

interface RequestWithUser extends Request {
  user: UserWithThings;
}

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private

const getProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await Project.find({ deleted: false });
    res.status(200).json(projects);
  }
);

// @desc    Create new project
// @route   POST /api/v1/projects
// @access  Private

const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    if (!(req as RequestWithUser).user.role.includes('admin')) {
      throw new Error('Not authorized');
    }

    if (!req.body.admin) {
      throw new Error('No admin provided');
    }
    if (!req.body.members) {
      throw new Error('No members provided');
    }
    if (!req.body.name) {
      throw new Error('No name provided');
    }
    if (!req.body.description) {
      throw new Error('No description provided');
    }
    if (!req.body.shortName) {
      throw new Error('No shortName provided');
    }

    const { name, description, shortName, admin, members } = req.body;

    const project = new Project({
      name,
      description,
      shortName,
      creator: (req as RequestWithUser).user._id,
      admins: [admin] || [],
      members: [admin, ...members] || [],
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

const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

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

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private

const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, shortName, admin, members } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.name = name;
      project.description = description;
      project.shortName = shortName;
      project.admins = [admin];
      project.members = [admin, ...members];

      const updatedProject = await project.save();

      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(400);
        throw new Error('Invalid project data');
      }
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  }
);

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private

const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.deleted = true;

      const updatedProject = await project.save();

      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(400);
        throw new Error('Invalid project data');
      }
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  }
);

export {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
