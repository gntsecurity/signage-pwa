import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { id } = body

  if (!id) return new NextResponse('Missing screen ID', { status: 400 })

  const code = generateCode()
  await kv.put(`pair:${code}`, JSON.stringify({ id }), { expirationTtl: 300 })

  return NextResponse.json({ code })
}
