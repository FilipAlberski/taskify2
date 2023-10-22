import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    unique: true,
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
