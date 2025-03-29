import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../lib/kv'
import { log } from '../../../lib/log'

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return new NextResponse('Missing screen ID', { status: 400 })
  }

  await kv.put(`status:${id}`, 'online', { expirationTtl: 60 })
  await log({ type: 'ping', screenId: id })

  return new NextResponse(null, { status: 204 })
}
