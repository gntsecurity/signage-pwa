'use client'

import { useParams } from 'next/navigation'

export default function ScreenPreview() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preview Screen: {id}</h2>
      <div className="border rounded overflow-hidden aspect-video w-full bg-black">
        <iframe
          src={`/display/${id}`}
          className="w-full h-full border-0"
          allow="autoplay"
        />
      </div>
    </div>
  )
}
