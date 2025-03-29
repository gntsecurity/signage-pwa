import { NextRequest, NextResponse } from 'next/server'
import { destroySession } from '../../../lib/session'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('session')?.value

  if (token) {
    await destroySession(token)
  }

  const res = new NextResponse(null, { status: 204 })
  res.cookies.set('session', '', {
    path: '/',
    maxAge: 0
  })

  return res
}
