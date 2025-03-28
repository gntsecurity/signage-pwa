export interface Device {
  id: string;
  name: string;
  token: string;
  current_schedule_id?: string;
  last_seen?: string;
}
