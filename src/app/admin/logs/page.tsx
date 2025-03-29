'use client'

import { useEffect, useState } from 'react'

interface LogEntry {
  timestamp: number
  event: string
  data: Record<string, any>
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    fetch('/api/log')
      .then((res) => res.json())
      .then((data) => setLogs(data.logs))
  }, [])

  return (
    <div className="max-w-5xl space-y-6">
      <h2 className="text-xl font-semibold mb-2">Audit Log</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border-b">Time</th>
            <th className="p-2 border-b">Event</th>
            <th className="p-2 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2 text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-2 font-medium">{log.event}</td>
              <td className="p-2 font-mono text-xs text-gray-600">
                {JSON.stringify(log.data)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
