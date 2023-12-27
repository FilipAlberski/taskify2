import express from 'express';
import { createTask } from '../controllers/taskController';
import { protectRoute } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', protectRoute, createTask);

export default router;
