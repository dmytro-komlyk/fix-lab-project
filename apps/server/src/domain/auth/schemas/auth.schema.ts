import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12)
});

export const signUpSchema = loginSchema.extend({
  name: z.string()
});

export const tokenSchema = z.object({
  acessToken: z.string().min(1),
  refreshToken: z.string().min(1)
});

export const outputAuthSchema = tokenSchema.extend({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string()
});

export type loginSchema = z.TypeOf<typeof loginSchema>;
export type signUpSchema = z.TypeOf<typeof signUpSchema>;
export type tokenSchema = z.TypeOf<typeof tokenSchema>;
export type outputAuthSchema = z.TypeOf<typeof outputAuthSchema>;
