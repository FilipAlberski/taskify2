import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  checkAuth,
} from '../controllers/userController';

import { protectRoute } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protectRoute, getProfile);
router.put('/profile', protectRoute, updateProfile);
router.get('/checkAuth', protectRoute, checkAuth);

export default router;
