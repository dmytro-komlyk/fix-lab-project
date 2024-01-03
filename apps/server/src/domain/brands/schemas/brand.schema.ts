import { z } from 'zod';

import { MetaSchema } from '@shared/schemas/metadata.schema';
import { imageSchema } from '../../images/schemas/image.schema';

export const createBrandSchema = z.object({
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(true),
  title: z.string().min(1),
  article: z.string().min(1),
  metadata: MetaSchema,
  icon_id: z.string().min(1)
});

export const updateBrandSchema = z.object({
  id: z.string(),
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(true),
  title: z.string().min(1),
  article: z.string().min(1),
  metadata: MetaSchema,
  icon_id: z.string().min(1)
});

export const outputBrandSchema = z.object({
  id: z.string(),
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(true),
  title: z.string().min(1),
  article: z.string().min(1),
  metadata: MetaSchema,
  icon: imageSchema,
  icon_id: z.string().min(1)
});

export type createBrandSchema = z.TypeOf<typeof createBrandSchema>;
export type updateBrandSchema = z.TypeOf<typeof updateBrandSchema>;
export type outputBrandSchema = z.TypeOf<typeof outputBrandSchema>;
