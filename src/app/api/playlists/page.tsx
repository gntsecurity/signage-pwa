'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Playlist {
  id: string
  name: string
  items: string[]
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetchPlaylists()
  }, [])

  async function fetchPlaylists() {
    const res = await fetch('/api/playlists')
    const data = await res.json()
    setPlaylists(data)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return

    await fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: uuidv4(),
        name,
        items: []
      })
    })

    setName('')
    fetchPlaylists()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Playlist</h2>
        <form onSubmit={handleAdd} className="flex gap-4 items-end">
          <div>
            <label className="block text-sm">Name</label>
            <input
              className="border px-3 py-2 rounded w-64"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Add
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Playlists</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Items</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist) => (
              <tr key={playlist.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{playlist.id}</td>
                <td className="p-2">{playlist.name}</td>
                <td className="p-2">{playlist.items.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
