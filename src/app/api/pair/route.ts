import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@/lib/kv'
import { log } from '@/lib/log'

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'Missing screen ID' }, { status: 400 })
  }

  const code = generateCode()
  const key = `pair:${code}`

  await kv.put(key, JSON.stringify({ id }), { expirationTtl: 300 })
  await log('screen:pair', { id, code })

  return NextResponse.json({ code })
}
