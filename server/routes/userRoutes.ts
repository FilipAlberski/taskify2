import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
