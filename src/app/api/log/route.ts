import { NextResponse } from 'next/server'
import { listLogs } from '../../../../lib/log'

export async function GET() {
  const logs = await listLogs()
  return NextResponse.json(logs)
}
