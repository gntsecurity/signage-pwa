import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code) return new NextResponse('Missing code', { status: 400 })

  const data = await kv.get(`pair:${code}`)
  if (!data) return new NextResponse('Invalid or expired code', { status: 404 })

  await kv.delete(`pair:${code}`)
  const parsed = JSON.parse(data)

  return NextResponse.json({ id: parsed.id })
}
