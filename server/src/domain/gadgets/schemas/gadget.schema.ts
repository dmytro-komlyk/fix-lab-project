import { z } from 'zod';

import { MetaSchema } from 'server/src/shared/schemas/metadata.schema';

export const GadgetSchema = z.object({
  id: z.string(),
  slug: z.string().min(1).trim().toLowerCase(),
  isActive: z.boolean().default(false),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  icon_id: z.string(),
  gallery_ids: z.array(z.string()),
  brand_ids: z.array(z.string()),
  issues_ids: z.array(z.string())
});
