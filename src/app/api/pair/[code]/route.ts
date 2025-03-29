import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'
import { log } from '../../../../lib/log'

export async function GET(
  _req: NextRequest, 
  { params }: { params: { [key: string]: string | string[] } }
) {
  const code = Array.isArray(params.code) ? params.code[0] : params.code
  const data = await kv.get(`pair:${code}`)
  return data
    ? NextResponse.json(JSON.parse(data))
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(
  _req: NextRequest, 
  { params }: { params: { [key: string]: string | string[] } }
) {
  const code = Array.isArray(params.code) ? params.code[0] : params.code
  await kv.delete(`pair:${code}`)
  await log('pair:delete', { code })
  return NextResponse.json({ ok: true })
}
