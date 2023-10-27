import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
});

// Attach event listeners to handle logs
prisma.$on('query', (e: any) => {
  logger.info(`Query: ${e.query}`);
  logger.info(`Duration: ${e.duration}ms`);
});

prisma.$on('info', (e: any) => {
  logger.info(e.message);
});

prisma.$on('warn', (e: any) => {
  logger.warn(e.message);
});

prisma.$on('error', (e: any) => {
  logger.error(e.message);
});

export default prisma;
