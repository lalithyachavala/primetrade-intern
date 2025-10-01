
import mongoose from 'mongoose';
import { env } from '../config/env';

export async function connectDB() {
  if (!env.MONGO_URI) throw new Error('MONGO_URI not set');
  await mongoose.connect(env.MONGO_URI);
  console.log('✅ MongoDB connected');
}
