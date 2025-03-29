import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

const PREFIX = 'pair:'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code) {
    return new NextResponse('Missing code', { status: 400 })
  }

  const screenId = await kv.get(PREFIX + code)

  if (!screenId) {
    return new NextResponse('Code not found or expired', { status: 404 })
  }

  return NextResponse.json({ id: screenId })
}
