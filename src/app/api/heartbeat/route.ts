import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@/lib/kv'
import { log } from '@/lib/log'

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'Missing screen ID' }, { status: 400 })
  }

  const now = Date.now().toString()
  await kv.put(`heartbeat:${id}`, now)
  await log('heartbeat', { id })

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ last: null })

  const ts = await kv.get(`heartbeat:${id}`)
  return NextResponse.json({ last: ts ?? null })
}
