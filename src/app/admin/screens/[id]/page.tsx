'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface ScheduleEntry {
  playlistId: string
  days: number[]
  start: string
  end: string
}

interface Screen {
  id: string
  name: string
  location?: string
  playlistId?: string
  schedules?: ScheduleEntry[]
}

interface Playlist {
  id: string
  name: string
}

export default function ScreenEditor() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [screen, setScreen] = useState<Screen | null>(null)
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    fetch(`/api/screens/${id}`)
      .then((res) => res.json())
      .then((data) => setScreen(data))

    fetch('/api/playlists')
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
  }, [id])

  function updateSchedule(index: number, field: string, value: any) {
    if (!screen || !screen.schedules) return
    const updated = [...screen.schedules]
    const entry = { ...updated[index] }

    if (field === 'days') {
      entry.days = value
    } else {
      entry[field as keyof ScheduleEntry] = value
    }

    updated[index] = entry
    setScreen({ ...screen, schedules: updated })
  }

  function toggleDay(index: number, day: number) {
    if (!screen || !screen.schedules) return
    const entry = { ...screen.schedules[index] }
    const has = entry.days.includes(day)
    const next = has ? entry.days.filter((d) => d !== day) : [...entry.days, day]
    updateSchedule(index, 'days', next)
  }

  function addSchedule() {
    if (!screen) return
    const next = screen.schedules ?? []
    const entry: ScheduleEntry = {
      playlistId: playlists[0]?.id ?? '',
      days: [1, 2, 3, 4, 5],
      start: '09:00',
      end: '17:00'
    }
    setScreen({ ...screen, schedules: [...next, entry] })
  }

  function removeSchedule(index: number) {
    if (!screen || !screen.schedules) return
    const updated = [...screen.schedules]
    updated.splice(index, 1)
    setScreen({ ...screen, schedules: updated })
  }

  async function save() {
    if (!screen) return
    await fetch(`/api/screens/${screen.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(screen)
    })
    router.push('/admin/screens')
  }

  if (!screen) {
    return <div className="text-sm text-gray-500 p-4">Loading screen...</div>
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <h2 className="text-xl font-semibold">Edit Screen</h2>

      <div className="space-y-4">
        <label className="block text-sm">Name</label>
        <input
          className="border px-3 py-2 rounded w-full"
          value={screen.name}
          onChange={(e) => setScreen({ ...screen, name: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm">Location</label>
        <input
          className="border px-3 py-2 rounded w-full"
          value={screen.location ?? ''}
          onChange={(e) => setScreen({ ...screen, location: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="block font-medium text-sm mb-2">Schedule</label>

        {(screen.schedules ?? []).map((entry, i) => (
          <div key={i} className="border p-4 bg-white rounded space-y-2 shadow-sm">
            <div className="flex items-center gap-4">
              <select
                value={entry.playlistId}
                onChange={(e) => updateSchedule(i, 'playlistId', e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {playlists.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <input
                type="time"
                value={entry.start}
                onChange={(e) => updateSchedule(i, 'start', e.target.value)}
                className="border px-2 py-1 rounded"
              />

              <span>→</span>

              <input
                type="time"
                value={entry.end}
                onChange={(e) => updateSchedule(i, 'end', e.target.value)}
                className="border px-2 py-1 rounded"
              />
            </div>

            <div className="flex gap-2 text-sm text-center">
              {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDay(i, d)}
                  className={`px-2 py-1 border rounded w-8 ${
                    entry.days.includes(d) ? 'bg-blue-600 text-white' : 'bg-gray-100'
                  }`}
                >
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][d]}
                </button>
              ))}
            </div>

            <button
              onClick={() => removeSchedule(i)}
              className="text-red-600 text-xs mt-1"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          onClick={addSchedule}
          className="bg-gray-200 text-sm px-3 py-1 rounded"
        >
          + Add Schedule
        </button>
      </div>

      <button
        onClick={save}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Save Screen
      </button>
    </div>
  )
}
