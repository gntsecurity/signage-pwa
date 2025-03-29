'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Screen {
  id: string
  name: string
  location?: string
  code?: string
}

export default function ScreenEditorPage() {
  const { id } = useParams<{ id: string }>()
  const [screen, setScreen] = useState<Screen | null>(null)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    if (id) fetchScreen()
  }, [id])

  async function fetchScreen() {
    const res = await fetch(`/api/screens/${id}`)
    const data = await res.json()
    setScreen(data)
    setName(data.name || '')
    setLocation(data.location || '')
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()

    await fetch(`/api/screens/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location })
    })

    fetchScreen()
  }

  async function generateCode() {
    const res = await fetch('/api/pair/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    if (res.ok) {
      const { code } = await res.json()
      setCode(code)
    }
  }

  if (!screen) {
    return <div className="p-8 text-gray-500">Loading...</div>
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">Edit Screen</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Save Changes
        </button>
      </form>

      <div className="pt-8 border-t">
        <h2 className="text-lg font-semibold mb-2">Pairing</h2>
        <button
          onClick={generateCode}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
        >
          Generate Pairing Code
        </button>
        {code && (
          <div className="mt-4 text-center text-2xl font-mono bg-gray-100 border rounded py-2">
            {code}
          </div>
        )}
      </div>
    </div>
  )
}
