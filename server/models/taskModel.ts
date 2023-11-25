import mongoose from 'mongoose';

interface ITask {
  title: string;
  taskId: string;
  shortName: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IProject {
  name: string;
  description: string;
  shortName: string;
  tasks: mongoose.Types.ObjectId[];
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  taskId: {
    type: String,
    unique: true,
  },
  shortName: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo',
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre<ITask>('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
taskSchema.pre<ITask>('save', async function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
    return next();
  }

  const project = await mongoose
    .model('Project')
    .findById(this.project);
  if (!project) {
    throw new Error('Project not found');
  }

  // Tylko zadania dla tego konkretnego projektu są liczone
  const taskCount = await mongoose
    .model('Task')
    .countDocuments({ project: this.project });
  this.taskId = `${project.shortName}-${taskCount + 1}`;

  next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
