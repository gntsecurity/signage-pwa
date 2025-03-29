'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PairPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/pair/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })

    if (!res.ok) {
      setError('Invalid or expired code')
      return
    }

    const data = await res.json()
    router.push(`/display/${data.id}`)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-900">
      <form onSubmit={handleSubmit} className="space-y-6 text-center">
        <h1 className="text-2xl font-bold">Enter Pairing Code</h1>
        <input
          type="text"
          maxLength={6}
          className="text-center border px-4 py-2 text-xl tracking-widest rounded"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ABC123"
          required
        />
        <div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Pair Screen
          </button>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  )
}
