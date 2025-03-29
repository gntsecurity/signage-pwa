import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { id } = await req.json()
  const code = params.code

  if (!id || !code) {
    return new NextResponse('Missing screen ID or code', { status: 400 })
  }

  const exists = await kv.get(`pair:${code}`)

  if (!exists) {
    return new NextResponse('Invalid or expired code', { status: 404 })
  }

  await kv.put(`screen:${id}`, JSON.stringify({ ...JSON.parse(exists as string), id }))
  await kv.delete(`pair:${code}`)

  return new NextResponse(null, { status: 204 })
}
