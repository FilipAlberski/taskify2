import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// @route   GET api/v1/auth

router.post('/login', login);
export default router;
