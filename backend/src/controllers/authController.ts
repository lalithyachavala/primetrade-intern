
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import { signToken } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(StatusCodes.CONFLICT).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password });
  const token = signToken({ id: user._id });
  res.status(StatusCodes.CREATED).json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user._id });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}
