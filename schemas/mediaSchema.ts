import { z } from 'zod';

export const mediaSchema = z.object({
  id: z.string().uuid("Invalid media ID format"),
  type: z.enum(['image', 'video']),
  src: z.string().url("Invalid media source URL"),
  duration: z.number().positive("Duration must be greater than zero"),
});

export type MediaSchema = z.infer<typeof mediaSchema>;
