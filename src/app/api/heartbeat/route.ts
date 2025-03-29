import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'
import { logEvent } from '../../../../lib/log'

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return new NextResponse('Missing ID', { status: 400 })
  }

  await kv.set(`heartbeat:${id}`, '1', { expirationTtl: 60 })

  await logEvent({
    type: 'heartbeat',
    screenId: id,
    timestamp: Date.now()
  })

  return new NextResponse(null, { status: 204 })
}
