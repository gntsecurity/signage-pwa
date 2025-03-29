import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { id } = await req.json()
  const { code } = params

  if (!id || !code) {
    return new NextResponse('Missing ID or code', { status: 400 })
  }

  await kv.put(`pair:${code}`, id, { expirationTtl: 300 })
  return new NextResponse(null, { status: 204 })
}

export async function GET(_: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params

  const id = await kv.get(`pair:${code}`)

  if (!id) {
    return new NextResponse('Invalid or expired code', { status: 404 })
  }

  return NextResponse.json({ id })
}
