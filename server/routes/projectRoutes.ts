import express from 'express';
import { getProjects } from '../controllers/projectController';
import { protectRoute } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', protectRoute, getProjects);

export default router;
