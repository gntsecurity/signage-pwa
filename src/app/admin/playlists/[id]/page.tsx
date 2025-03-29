'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

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

export default function PlaylistEditor() {
  const { id } = useParams() // No type argument here
  const router = useRouter()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)

  useEffect(() => {
    fetch(`/api/playlists/${id}`)
      .then((res) => res.json())
      .then((data) => setPlaylist(data))
  }, [id])

  function updateItem(index: number, key: string, value: string) {
    if (!playlist) return
    const updated = [...playlist.items]
    const item = { ...updated[index] }

    if (key === 'duration') {
      item.duration = Number(value)
    } else if (item.type === 'text' && key === 'value') {
      item.value = value
    } else if (key === 'src') {
      item.src = value
    }

    updated[index] = item
    setPlaylist({ ...playlist, items: updated })
  }

  function removeItem(index: number) {
    if (!playlist) return
    const updated = [...playlist.items]
    updated.splice(index, 1)
    setPlaylist({ ...playlist, items: updated })
  }

  function moveItem(index: number, direction: 'up' | 'down') {
    if (!playlist) return
    const updated = [...playlist.items]
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= updated.length) return

    const temp = updated[index]
    updated[index] = updated[target]
    updated[target] = temp

    setPlaylist({ ...playlist, items: updated })
  }

  function addItem(type: PlaylistItem['type']) {
    if (!playlist) return

    const newItem: PlaylistItem =
      type === 'text'
        ? { type: 'text', value: 'New message', duration: 10 }
        : { type, src: '', duration: 10 }

    setPlaylist({ ...playlist, items: [...playlist.items, newItem] })
  }

  async function save() {
    if (!playlist) return
    await fetch(`/api/playlists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playlist)
    })
    router.push('/admin/playlists')
  }

  if (!playlist) {
    return <div className="text-gray-500 text-sm p-4">Loading playlist...</div>
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <h2 className="text-xl font-semibold">Edit Playlist</h2>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          value={playlist.name}
          onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="flex gap-4">
        <label className="block text-sm font-medium mt-2">Add Item</label>
        <button
          onClick={() => addItem('text')}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          Text
        </button>
        <button
          onClick={() => addItem('image')}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          Image
        </button>
        <button
          onClick={() => addItem('video')}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          Video
        </button>
        <button
          onClick={() => addItem('url')}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          URL
        </button>
      </div>

      <div className="space-y-6">
        {playlist.items.map((item, i) => (
          <div key={i} className="border p-4 rounded bg-white shadow-sm space-y-3">
            <div className="text-xs text-gray-500 uppercase">{item.type}</div>

            {item.type === 'text' && (
              <input
                value={item.value}
                onChange={(e) => updateItem(i, 'value', e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            )}

            {'src' in item && (
              <input
                value={item.src}
                onChange={(e) => updateItem(i, 'src', e.target.value)}
                placeholder="Source URL"
                className="w-full px-2 py-1 border rounded text-sm"
              />
            )}

            <input
              type="number"
              value={item.duration ?? ''}
              onChange={(e) => updateItem(i, 'duration', e.target.value)}
              placeholder="Duration (seconds)"
              className="w-40 px-2 py-1 border rounded text-sm"
            />

            <div className="flex gap-2 text-xs text-blue-600 mt-2">
              <button onClick={() => moveItem(i, 'up')}>↑ Up</button>
              <button onClick={() => moveItem(i, 'down')}>↓ Down</button>
              <button onClick={() => removeItem(i)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Save Playlist
      </button>
    </div>
  )
}
