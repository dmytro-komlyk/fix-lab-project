import { z } from 'zod';

import { MetaSchema } from '@shared/schemas/metadata.schema';
import { outputBrandSchema } from '../../brands/schemas/brand.schema';
import { imageSchema } from '../../images/schemas/image.schema';
import { outputIssueSchema } from '../../issues/schemas/issue.schema';

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

export const outputGadgetSchema = z.object({
  id: z.string(),
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(false),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  icon_id: z.string(),
  icon: imageSchema,
  gallery: z.array(imageSchema),
  brands: z.array(outputBrandSchema),
  issues: z.array(outputIssueSchema),
  gallery_ids: z.array(z.string()),
  brands_ids: z.array(z.string()),
  issues_ids: z.array(z.string())
});

export type createGadgetSchema = z.TypeOf<typeof createGadgetSchema>;
export type updateGadgetSchema = z.TypeOf<typeof updateGadgetSchema>;
export type outputGadgetSchema = z.TypeOf<typeof outputGadgetSchema>;
