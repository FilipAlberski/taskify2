import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this project'],
  },

  description: {
    type: String,
    required: [true, 'Please provide a description for this project'],
  },

  shortName: {
    type: String,

    required: [true, 'Please provide a short name for this project'],
    maxlength: [
      5,
      'Please provide a short name with 5 characters or less',
    ],
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  deletedAt: {
    type: Date,
    default: null,
  },

  deleted: {
    type: Boolean,
    default: false,
  },

  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
