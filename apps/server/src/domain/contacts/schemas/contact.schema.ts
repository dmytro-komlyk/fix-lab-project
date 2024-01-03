import { z } from 'zod';

import { imageSchema } from '../../images/schemas/image.schema';

export const createContactSchema = z.object({
  isActive: z.boolean().default(true),
  area: z.string().min(1),
  address: z.string(),
  comment: z.string().default(''),
  subways: z.array(z.string().min(1)),
  phones: z.array(z.string().min(1)),
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
  comment: z.string().default(''),
  subways: z.array(z.string().min(1)),
  phones: z.array(z.string().min(1)),
  workingTime: z.string().default(''),
  workingDate: z.string().default(''),
  googleMapLink: z.string().default(''),
  googlePluginLink: z.string().default(''),
  image_id: z.string().min(1)
});

export const outputContactSchema = z.object({
  id: z.string().min(1),
  isActive: z.boolean().default(true),
  area: z.string().min(1),
  address: z.string(),
  comment: z.string().default(''),
  subways: z.array(z.string().min(1)),
  phones: z.array(z.string().min(1)),
  workingTime: z.string().default(''),
  workingDate: z.string().default(''),
  googleMapLink: z.string().default(''),
  googlePluginLink: z.string().default(''),
  image_id: z.string().min(1),
  image: imageSchema
});

export type createContactSchema = z.TypeOf<typeof createContactSchema>;
export type updateContactSchema = z.TypeOf<typeof updateContactSchema>;
export type outputContactSchema = z.TypeOf<typeof outputContactSchema>;
