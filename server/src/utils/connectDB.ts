import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error: any) {
    console.error(`🚫 ${error.message}`);
  }
};

export default connectDB;
