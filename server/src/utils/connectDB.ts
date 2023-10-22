import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URI as string);
  mongoose.connection.on('error', (err) => {
    console.error(`🚫 ${err.message}`);
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

export default connectDB;
