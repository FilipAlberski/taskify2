import express from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protectRoute } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', protectRoute, getProjects);
router.post('/', protectRoute, createProject);
router.get('/:id', protectRoute, getProjectById);
router.put('/:id', protectRoute, updateProject);
router.delete('/:id', protectRoute, deleteProject);

export default router;
