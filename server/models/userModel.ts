import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
    },
    userName: {
      type: String,
      required: [true, 'Please provide your user name'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
