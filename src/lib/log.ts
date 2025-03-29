import { kv } from './kv'

const LOG_KEY = 'audit:log'

export interface LogEntry {
  timestamp: number
  event: string
  data: Record<string, any>
}

export async function log(event: string, data: Record<string, any> = {}) {
  const entry: LogEntry = {
    timestamp: Date.now(),
    event,
    data
  }

  const existing = await kv.get<string>(LOG_KEY)
  const list: LogEntry[] = existing ? JSON.parse(existing) : []

  list.push(entry)
  if (list.length > 200) list.shift()

  await kv.put(LOG_KEY, JSON.stringify(list))
}

export async function listLogs(limit = 100): Promise<LogEntry[]> {
  const raw = await kv.get<string>(LOG_KEY)
  const list: LogEntry[] = raw ? JSON.parse(raw) : []
  return list.slice(-limit).reverse()
}
