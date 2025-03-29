'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Screen {
  id: string
  name: string
  location?: string
}

export default function ScreensPage() {
  const [screens, setScreens] = useState<Screen[]>([])
  const [statuses, setStatuses] = useState<Record<string, 'Online' | 'Offline'>>({})

  useEffect(() => {
    fetchScreens()
  }, [])

  async function fetchScreens() {
    const res = await fetch('/api/screens')
    const data = await res.json()
    setScreens(data)

    const entries = await Promise.all(
      data.map(async (s: Screen) => {
        const res = await fetch(`/api/heartbeat?id=${s.id}`, { cache: 'no-store' })
        const { last } = await res.json()
        const age = last ? Date.now() - Number(last) : Infinity
        return [s.id, age < 60000 ? 'Online' : 'Offline']
      })
    )
    setStatuses(Object.fromEntries(entries))
  }

  async function deleteScreen(id: string) {
    const confirmed = confirm('Delete this screen?')
    if (!confirmed) return

    await fetch(`/api/screens/${id}`, { method: 'DELETE' })
    fetchScreens()
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registered Screens</h2>
        <Link
          href="/admin/screens/new"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add Screen
        </Link>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Location</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((screen) => (
            <tr key={screen.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{screen.id}</td>
              <td className="p-2">{screen.name}</td>
              <td className="p-2">{screen.location || '-'}</td>
              <td className="p-2">
                <span
                  className={
                    statuses[screen.id] === 'Online'
                      ? 'text-green-600 font-medium'
                      : 'text-gray-400'
                  }
                >
                  {statuses[screen.id] ?? '...'}
                </span>
              </td>
              <td className="p-2 space-x-4">
                <Link
                  href={`/admin/screens/${screen.id}/preview`}
                  className="text-blue-700 hover:underline"
                >
                  Preview
                </Link>
                <button
                  onClick={() => deleteScreen(screen.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
