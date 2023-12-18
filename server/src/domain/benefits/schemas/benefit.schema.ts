import { z } from 'zod';

export const createBenefitSchema = z.object({
  title: z.string().min(1),
  isActive: z.boolean().default(true),
  icon_id: z.string()
});

export const updateBenefitSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  isActive: z.boolean().default(true),
  icon_id: z.string()
});

export type createBenefitSchema = z.TypeOf<typeof createBenefitSchema>;
export type updateBenefitSchema = z.TypeOf<typeof updateBenefitSchema>;
