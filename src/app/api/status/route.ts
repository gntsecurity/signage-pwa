import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../lib/kv'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return new NextResponse('Missing id', { status: 400 })

  const key = `screen:${id}:lastSeen`
  const lastSeen = await kv.get(key)
  const isOnline = lastSeen && Date.now() - Number(lastSeen) < 2 * 60 * 1000 // 2 min

  return NextResponse.json({ status: isOnline ? 'online' : 'offline' })
}
