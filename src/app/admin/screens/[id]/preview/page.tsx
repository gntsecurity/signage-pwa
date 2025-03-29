'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'

type PlaylistItem =
  | { type: 'image'; src: string; duration?: number }
  | { type: 'video'; src: string; duration?: number }
  | { type: 'url'; src: string; duration?: number }
  | { type: 'text'; value: string; duration?: number }

interface Playlist {
  id: string
  name: string
  items: PlaylistItem[]
}

interface ScheduleEntry {
  playlistId: string
  days: number[]
  start: string
  end: string
}

interface Screen {
  id: string
  name: string
  playlistId?: string
  schedules?: ScheduleEntry[]
}

export default function ScreenPreview() {
  const { id } = useParams<{ id: string }>()
  const [screen, setScreen] = useState<Screen | null>(null)
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function isNowWithin(start: string, end: string): boolean {
    const now = new Date()
    const [h1, m1] = start.split(':').map(Number)
    const [h2, m2] = end.split(':').map(Number)
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    const startMinutes = h1 * 60 + m1
    const endMinutes = h2 * 60 + m2
    return nowMinutes >= startMinutes && nowMinutes < endMinutes
  }

  async function resolvePlaylist(s: Screen): Promise<Playlist | null> {
    if (!s.schedules || s.schedules.length === 0) {
      if (!s.playlistId) return null
      return fetch(`/api/playlists/${s.playlistId}`).then((r) => r.json())
    }

    const today = new Date().getDay()
    const match = s.schedules.find(
      (entry) => entry.days.includes(today) && isNowWithin(entry.start, entry.end)
    )

    if (!match) return null
    return fetch(`/api/playlists/${match.playlistId}`).then((r) => r.json())
  }

  async function load() {
    const screenRes = await fetch(`/api/screens/${id}`)
    const screenData = await screenRes.json()
    setScreen(screenData)

    const resolved = await resolvePlaylist(screenData)
    setPlaylist(resolved)
  }

  useEffect(() => {
    if (!id) return
    load()
  }, [id])

  useEffect(() => {
    if (!playlist || playlist.items.length === 0) return

    const current = playlist.items[index]
    const duration = current.duration ?? 10

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % playlist.items.length)
    }, duration * 1000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index, playlist])

  if (!screen || !playlist) {
    return (
      <div className="text-gray-500 text-sm p-4">
        No content to preview. Make sure this screen is scheduled.
      </div>
    )
  }

  const current = playlist.items[index]

  return (
    <div className="w-full aspect-video bg-black text-white flex items-center justify-center overflow-hidden">
      {current?.type === 'image' && (
        <img src={current.src} alt="" className="object-contain max-w-full max-h-full" />
      )}
      {current?.type === 'video' && (
        <video
          src={current.src}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      )}
      {current?.type === 'url' && (
        <iframe
          src={current.src}
          className="w-full h-full border-0"
          allow="autoplay"
        />
      )}
      {current?.type === 'text' && (
        <div className="text-4xl font-bold text-center px-8">{current.value}</div>
      )}
    </div>
  )
}
