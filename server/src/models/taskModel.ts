import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    unique: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  description: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  image: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
});
