import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../../lib/kv'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code) {
    return new NextResponse('Missing pairing code', { status: 400 })
  }

  const id = await kv.get(`pair:${code}`)

  if (!id) {
    return new NextResponse('Invalid or expired code', { status: 404 })
  }

  return NextResponse.json({ id })
}
