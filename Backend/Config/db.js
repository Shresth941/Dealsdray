import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://1rn20ec087shresthsingh:Shresth123@cluster0.q1xtp.mongodb.net/?retryWrites=true&w=majority',
     
    );
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); 
  }
};
