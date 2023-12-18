import { z } from 'zod';

import { MetaSchema } from 'server/src/shared/schemas/metadata.schema';

export const createIssueSchema = z.object({
  isActive: z.boolean().default(true),
  slug: z.string().trim().toLowerCase(),
  title: z.string().min(1),
  info: z.string(),
  description: z.string(),
  price: z.string().min(1),
  metadata: MetaSchema,
  image_id: z.string(),
  benefits_ids: z.array(z.string())
});

export const updateIssueSchema = z.object({
  id: z.string(),
  isActive: z.boolean().default(false),
  slug: z.string().trim().toLowerCase(),
  title: z.string().min(1),
  info: z.string(),
  description: z.string(),
  price: z.string().min(1),
  metadata: MetaSchema,
  image_id: z.string(),
  benefits_ids: z.array(z.string())
});

export type createIssueSchema = z.TypeOf<typeof createIssueSchema>;
export type updateIssueSchema = z.TypeOf<typeof updateIssueSchema>;
