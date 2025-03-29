import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'
import { log } from '../../../../lib/log'

interface RouteContext {
  params: { code: string }
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const data = await kv.get(`pair:${params.code}`)
  return data
    ? NextResponse.json(JSON.parse(data))
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  await kv.delete(`pair:${params.code}`)
  await log('pair:delete', { code: params.code })
  return NextResponse.json({ ok: true })
}
