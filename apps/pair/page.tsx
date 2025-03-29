'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PairDevicePage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePair = async () => {
    setError('');

    try {
      const res = await fetch('/api/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('Pairing failed');

      const data = await res.json();
      localStorage.setItem('device-token', data.token);
      router.push('/display');
    } catch {
      setError('Failed to pair device.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Pair This Device</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter device name"
          className="w-full p-3 rounded text-black"
        />
        <button
          onClick={handlePair}
          className="w-full bg-white text-black font-semibold py-2 px-4 rounded"
        >
          Pair Device
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
