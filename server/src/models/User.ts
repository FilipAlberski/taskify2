import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  projects: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      default: 'user',
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export default User;
