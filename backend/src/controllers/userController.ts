
import { Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export async function me(req: AuthRequest, res: Response) {
  const user = await User.findById(req.user!.id).select('name email');
  res.json(user);
}

export async function updateMe(req: AuthRequest, res: Response) {
  const user = await User.findByIdAndUpdate(req.user!.id, { $set: req.body }, { new: true }).select('name email');
  res.json(user);
}
