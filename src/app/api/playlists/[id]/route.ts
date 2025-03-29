import { kv } from '../../../../lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { log } from '../../../../lib/log'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const data = await kv.get(`playlist:${params.id}`)
  return data
    ? NextResponse.json(JSON.parse(data))
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  await kv.put(`playlist:${params.id}`, JSON.stringify(body))
  await log('playlist:update', { id: params.id })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await kv.delete(`playlist:${params.id}`)
  await log('playlist:delete', { id: params.id })
  return NextResponse.json({ ok: true })
}
