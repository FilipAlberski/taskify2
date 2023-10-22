import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Password must be at least 6 characters long'],
  },
  profilePicture: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

export default User;
