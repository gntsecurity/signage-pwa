import { NextRequest, NextResponse } from 'next/server'
import { kv } from '../../../../lib/kv'

const CODE_TTL = 60 * 5 // 5 minutes
const PREFIX = 'pair:'

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return new NextResponse('Missing screen ID', { status: 400 })
  }

  const code = generateCode()

  await kv.put(PREFIX + code, id, { expirationTtl: CODE_TTL })

  return NextResponse.json({ code })
}
