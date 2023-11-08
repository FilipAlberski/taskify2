import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from '../controllers/userController';

import { refreshToken } from '../controllers/refreshTokenController';

import { protectRoute } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protectRoute, getProfile);
router.put('/profile', protectRoute, updateProfile);
router.get('/refresh_token', refreshToken);

export default router;
