import { kv } from '../../../../lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { log } from '../../../../lib/log'

export async function GET(_req: NextRequest, context: { params: { code: string } }) {
  const data = await kv.get(`pair:${context.params.code}`)
  return data
    ? NextResponse.json(JSON.parse(data))
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(_req: NextRequest, context: { params: { code: string } }) {
  await kv.delete(`pair:${context.params.code}`)
  await log('pair:delete', { code: context.params.code })
  return NextResponse.json({ ok: true })
}
