import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: { [key: string]: string | string[] | undefined }
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const code = params.code as string
  const data = await kv.get(`pair:${code}`)
  return data
    ? NextResponse.json(JSON.parse(data))
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const code = params.code as string
  await kv.delete(`pair:${code}`)
  await log('pair:delete', { code })
  return NextResponse.json({ ok: true })
}
