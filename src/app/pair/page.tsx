'use client'

import { useState } from 'react'

export default function PairPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (code.length !== 6) {
      setError('Enter a 6-digit code.')
      return
    }

    setStatus('loading')
    const res = await fetch(`/api/pair/${code}`)
    const data = await res.json()

    if (!res.ok || !data?.id) {
      setError('Invalid or expired code.')
      setStatus('idle')
      return
    }

    localStorage.setItem('signage-screen-id', data.id)
    window.location.href = `/display/${data.id}`
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={submit} className="space-y-6 text-center max-w-xs w-full">
        <h1 className="text-2xl font-bold">Pair This Screen</h1>
        <p className="text-gray-400 text-sm">Enter the 6-digit code from the admin panel.</p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputMode="numeric"
          className="w-full text-center text-3xl tracking-widest bg-gray-800 border border-gray-700 rounded px-4 py-3"
          placeholder="123456"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {status === 'loading' ? 'Pairing...' : 'Pair Screen'}
        </button>
      </form>
    </div>
  )
}
