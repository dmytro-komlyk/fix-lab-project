import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  login: z.string().min(1).toLowerCase(),
  email: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
  token: z.string().default('')
});

export type userSchema = z.TypeOf<typeof userSchema>;
