
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function signToken(payload: object) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: parseInt(env.JWT_EXPIRES_IN, 10) });
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, env.JWT_SECRET) as T;
}
