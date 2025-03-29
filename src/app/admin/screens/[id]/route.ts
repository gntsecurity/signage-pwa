import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

const PREFIX = 'screen:'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const data = await kv.get(PREFIX + params.id)
  if (!data) return new NextResponse('Not found', { status: 404 })
  return NextResponse.json(JSON.parse(data))
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()

  if (!body.name) return new NextResponse('Name required', { status: 400 })

  const payload = {
    id: params.id,
    name: body.name,
    location: body.location || ''
  }

  await kv.put(PREFIX + params.id, JSON.stringify(payload))
  return new NextResponse(null, { status: 204 })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await kv.delete(PREFIX + params.id)
  return new NextResponse(null, { status: 204 })
}
