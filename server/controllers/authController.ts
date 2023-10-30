import mongoose from 'mongoose';
import { Request, Response } from 'express';
import logger from '../utils/logger';

const login = async (req: Request, res: Response) => {
  res.send('Login route');
};

export { login };
