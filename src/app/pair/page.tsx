'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PairScreenPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/pair/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })

    if (res.ok) {
      const { id } = await res.json()
      router.push(`/display/${id}`)
    } else {
      setError('Invalid or expired code. Please try again.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">Enter Pairing Code</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          maxLength={6}
          className="text-center text-xl px-4 py-2 border border-gray-300 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Pair Screen
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  )
}
