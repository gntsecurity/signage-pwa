import { kv } from '../../../../lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { log } from '../../../../lib/log'

export async function GET(_req: NextRequest, { params }: { params: { code: string } }) {
  const data = await kv.get(`pair:${params.code}`)
  return data
    ? NextResponse.json(JSON.parse(data))
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(_req: NextRequest, { params }: { params: { code: string } }) {
  await kv.delete(`pair:${params.code}`)
  await log('pair:delete', { code: params.code })
  return NextResponse.json({ ok: true })
}
