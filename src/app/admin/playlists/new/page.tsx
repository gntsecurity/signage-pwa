'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function NewPlaylistPage() {
  const [name, setName] = useState('')
  const router = useRouter()

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()

    const id = uuidv4()
    const playlist = {
      id,
      name,
      items: []
    }

    await fetch(`/api/playlists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playlist)
    })

    router.push(`/admin/playlists/${id}`)
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-xl font-semibold">New Playlist</h2>

      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Playlist Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Create Playlist
        </button>
      </form>
    </div>
  )
}
