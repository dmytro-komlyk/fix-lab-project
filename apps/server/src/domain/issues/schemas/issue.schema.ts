import { z } from 'zod';

import { MetaSchema } from '@shared/schemas/metadata.schema';
import { outputBenefitSchema } from '../../benefits/schemas/benefit.schema';
import { imageSchema } from '../../images/schemas/image.schema';

export const createIssueSchema = z.object({
  isActive: z.boolean().default(true),
  slug: z.string().trim().toLowerCase(),
  title: z.string().min(1),
  info: z.string(),
  description: z.string(),
  price: z.string().min(1),
  metadata: MetaSchema,
  gadgets_ids: z.array(z.string()),
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
  gadgets_ids: z.array(z.string()),
  image_id: z.string(),
  benefits_ids: z.array(z.string())
});

export const outputIssueSchema = z.object({
  id: z.string(),
  isActive: z.boolean().default(true),
  slug: z.string().trim().toLowerCase(),
  title: z.string().min(1),
  info: z.string(),
  description: z.string(),
  price: z.string().min(1),
  metadata: MetaSchema,
  image: imageSchema,
  benefits: z.array(outputBenefitSchema),
  gadgets_ids: z.array(z.string()),
  image_id: z.string(),
  benefits_ids: z.array(z.string())
});

export type createIssueSchema = z.TypeOf<typeof createIssueSchema>;
export type updateIssueSchema = z.TypeOf<typeof updateIssueSchema>;
export type outputIssueSchema = z.TypeOf<typeof outputIssueSchema>;
