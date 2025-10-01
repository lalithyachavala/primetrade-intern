
import { z } from 'zod';

export const taskCreateSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['todo','doing','done']).optional(),
  }),
});

export const taskUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['todo','doing','done']).optional(),
  }),
});
