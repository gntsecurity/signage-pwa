import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../lib/kv'

const PREFIX = 'screen:'

export async function GET() {
  const list = await kv.list({ prefix: PREFIX })
  const keys = list.keys.map((k) => k.name)
  const screens = await Promise.all(
    keys.map(async (key) => {
      const raw = await kv.get(PREFIX + key)
      return raw ? JSON.parse(raw) : null
    })
  )

  return NextResponse.json(screens.filter(Boolean))
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.id || !body.name) {
    return new NextResponse('Missing required fields', { status: 400 })
  }

  await kv.put(PREFIX + body.id, JSON.stringify(body))

  return new NextResponse(null, { status: 201 })
}
