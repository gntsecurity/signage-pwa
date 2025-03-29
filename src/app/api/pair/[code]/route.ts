import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@/lib/kv'

export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code
  const data = await kv.get(`pair:${code}`)

  if (!data) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 404 })
  }

  return NextResponse.json(JSON.parse(data))
}
