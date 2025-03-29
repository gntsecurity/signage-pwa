import { NextRequest, NextResponse } from 'next/server'
import { getLogs } from '@/lib/log'

export async function GET(_req: NextRequest) {
  const logs = await getLogs(100)
  return NextResponse.json({ logs })
}
