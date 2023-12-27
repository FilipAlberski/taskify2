import User from '../models/userModel';
import Project from '../models/projectModel';
import Task from '../models/taskModel';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import { Request, Response } from 'express';

interface UserWithThings extends mongoose.Document {
  role: string;
}

interface RequestWithUser extends Request {
  user: UserWithThings;
}

interface ProjectWithThings extends mongoose.Document {
  name: string;
  description: string;
  shortName: string;
  creator: mongoose.Types.ObjectId;
  admins: mongoose.Types.ObjectId[];
  members: mongoose.Types.ObjectId[];
  deleted: boolean;
}

// @desc create new task
// @route POST /api/v1/tasks
// @access Private

const createTask = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, assignedTo, project } = req.body;

    const task = await Task.create({
      title,
      description,
      creator: (req as RequestWithUser).user._id,
      assignedTo,
      project,
    });

    if (task) {
      res.status(201).json({
        _id: task._id,
        title: task.title,
        description: task.description,
        creator: task.creator,
        assignedTo: task.assignedTo,
        project: task.project,
      });
    } else {
      res.status(400);
      throw new Error('Invalid task data');
    }
  }
);

export { createTask };
