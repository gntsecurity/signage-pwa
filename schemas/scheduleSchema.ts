import { z } from 'zod';
import { mediaSchema } from './mediaSchema';

export const scheduleSchema = z.object({
  id: z.string().uuid("Invalid schedule ID format"),
  name: z.string().min(1, "Schedule name is required"),
  media: z.array(mediaSchema).min(1, "At least one media item is required"),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time format",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end time format",
  }),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
