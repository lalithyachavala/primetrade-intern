
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request { user?: { id: string } }

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;
  console.log('Auth Middleware - Token:', token);
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing token' });
  try {
    const payload = verifyToken<{ id: string }>(token);
    req.user = { id: payload.id };
    next();
  } catch (e: any) {
    console.log('JWT verify error:', e?.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
}

}
