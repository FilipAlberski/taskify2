import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    deletedAt: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
