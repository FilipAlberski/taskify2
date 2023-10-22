import dotenv from 'dotenv';
dotenv.config(
  process.env.NODE_ENV === 'production'
    ? { path: '../.env.production' }
    : { path: '../.env.development' }
);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import connectDB from './utils/connectDB';
//routes import
import authRoutes from './routes/authRoutes';

mongoose.set('strictQuery', false);

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;
connectDB();
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
