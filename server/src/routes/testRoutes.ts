import express from 'express';
import TestController from '../controllers/testController';

const router = express.Router();

router.post('/add', TestController.addTest);
router.get('/', TestController.getTests);

export default router;
