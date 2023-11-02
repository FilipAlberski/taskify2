import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from '../controllers/userController';

import { protectRoute } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protectRoute, getProfile);
router.put('/profile', protectRoute, updateProfile);

export default router;
