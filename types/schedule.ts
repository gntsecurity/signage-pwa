export interface Schedule {
  id: string;
  name: string;
  layout: any; // Layout can be complex (media, timings, etc.)
  start_time: string;
  end_time: string;
}
