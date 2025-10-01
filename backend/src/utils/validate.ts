
import { ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const data = { body: req.body, query: req.query, params: req.params };
  const result = schema.safeParse(data);
  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Validation error',
      issues: result.error.format(),
    });
  }
  next();
};
