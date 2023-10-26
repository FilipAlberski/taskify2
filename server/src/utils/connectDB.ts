import logger from './logger';
import { Sequelize } from 'sequelize';

const DB_URI = process.env.DB_URI || '';

const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  logging: (msg) => logger.info(msg), // Integrate Sequelize logging with your Winston logger
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info(
      'Connection to the database has been established successfully.'
    );
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process with a failure code
  }
};

export default connectDB;
