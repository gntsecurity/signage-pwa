import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../lib/kv'

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return new NextResponse('Missing screen ID', { status: 400 })
  }

  const code = generateCode()

  await kv.put(`pair:${code}`, id, { expirationTtl: 300 }) // Expires in 5 minutes

  return NextResponse.json({ code })
}
