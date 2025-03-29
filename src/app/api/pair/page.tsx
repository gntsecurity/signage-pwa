'use client'

import { useState } from 'react'

export default function PairPage() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
  const [screenId, setScreenId] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('verifying')

    const res = await fetch('/api/pair/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })

    if (res.ok) {
      const data = await res.json()
      setScreenId(data.id)
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Screen Pairing</h1>
        {status === 'success' ? (
          <div className="text-center text-green-600 font-medium">
            ✅ Screen paired successfully!
            <div className="text-sm text-gray-500 mt-2">Screen ID: {screenId}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Enter Pairing Code</label>
              <input
                type="text"
                className="border px-4 py-2 rounded w-full text-center tracking-widest text-xl"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                inputMode="numeric"
                pattern="\d{6}"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800"
            >
              {status === 'verifying' ? 'Verifying...' : 'Pair'}
            </button>
            {status === 'error' && (
              <div className="text-sm text-red-600 text-center">Invalid or expired code</div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
