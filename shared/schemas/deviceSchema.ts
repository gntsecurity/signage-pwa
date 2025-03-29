import { z } from 'zod';

export const deviceSchema = z.object({
  id: z.string().uuid("Invalid device ID format"),
  name: z.string().min(1, "Device name is required"),
  token: z.string().min(1, "Device token is required"),
  current_schedule_id: z.string().optional(),
  last_seen: z.string().optional(),
});

export type DeviceSchema = z.infer<typeof deviceSchema>;
