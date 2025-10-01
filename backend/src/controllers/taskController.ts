
import { Response } from 'express';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export async function listTasks(req: AuthRequest, res: Response) {
  const { q, status } = req.query as { q?: string; status?: string };
  const filter: any = { user: req.user!.id };
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (status) filter.status = status;
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
}

export async function createTask(req: AuthRequest, res: Response) {
  const task = await Task.create({ user: req.user!.id, ...req.body });
  res.status(201).json(task);
}

export async function updateTask(req: AuthRequest, res: Response) {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user!.id }, { $set: req.body }, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
}

export async function deleteTask(req: AuthRequest, res: Response) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(204).send();
}
