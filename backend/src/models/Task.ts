
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITask extends Document {
  user: Types.ObjectId;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'done';
}

const taskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
}, { timestamps: true });

export const Task = mongoose.model<ITask>('Task', taskSchema);
