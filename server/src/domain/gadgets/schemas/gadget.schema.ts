import { z } from 'zod';

import { MetaSchema } from 'server/src/shared/schemas/metadata.schema';

export const createGadgetSchema = z.object({
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(false),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  icon_id: z.string(),
  gallery_ids: z.array(z.string()),
  brands_ids: z.array(z.string()),
  issues_ids: z.array(z.string())
});

export const updateGadgetSchema = z.object({
  id: z.string(),
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(false),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  icon_id: z.string(),
  gallery_ids: z.array(z.string()),
  brands_ids: z.array(z.string()),
  issues_ids: z.array(z.string())
});

export type createGadgetSchema = z.TypeOf<typeof createGadgetSchema>;
export type updateGadgetSchema = z.TypeOf<typeof updateGadgetSchema>;
