import { z } from 'zod';

export const layoutSchema = z.object({
  media: z.array(
    z.object({
      type: z.enum(['image', 'video']),
      src: z.string().url("Invalid media source URL"),
      duration: z.number().positive("Duration must be greater than zero"),
    })
  ).min(1, "At least one media item is required"),
  layoutType: z.enum(['grid', 'single']),
});

export type LayoutSchema = z.infer<typeof layoutSchema>;
