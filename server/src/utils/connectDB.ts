import mongoose from 'mongoose';
import logger from './logger'; // Make sure you have this utility.

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/yourDBName'; // replace with your connection string
const CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGO_URI, CONNECTION_OPTIONS as any);
    logger.info('MongoDB connected successfully.');
  } catch (error) {
    logger.error(
      'MongoDB connection failed. Retrying in 5 seconds.',
      error
    );
    setTimeout(connectWithRetry, 5000);
  }
};

const connectDB = async () => {
  await connectWithRetry();

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB event connected.');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB event error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB event disconnected.');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.warn('MongoDB disconnected due to app termination.');
    process.exit(0);
  });
};

export default connectDB;
