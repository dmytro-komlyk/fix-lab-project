import { z } from 'zod';

export const createContactSchema = z.object({
  isActive: z.boolean().default(true),
  area: z.string().min(1),
  address: z.string(),
  comment: z.string().min(1).default(''),
  subway: z.string().min(1),
  phone: z.string().min(1),
  workingTime: z.string().default(''),
  workingDate: z.string().default(''),
  googleMapLink: z.string().default(''),
  googlePluginLink: z.string().default(''),
  image_id: z.string().min(1)
});

export const updateContactSchema = z.object({
  id: z.string().min(1),
  isActive: z.boolean().default(true),
  area: z.string().min(1),
  address: z.string(),
  comment: z.string().min(1).default(''),
  subway: z.string().min(1),
  phone: z.string().min(1),
  workingTime: z.string().default(''),
  workingDate: z.string().default(''),
  googleMapLink: z.string().default(''),
  googlePluginLink: z.string().default(''),
  image_id: z.string().min(1)
});

export type createContactSchema = z.TypeOf<typeof createContactSchema>;
export type updateContactSchema = z.TypeOf<typeof updateContactSchema>;
