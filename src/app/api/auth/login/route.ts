import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const valid =
    email === 'admin@gntsecurity.com' && password === 'password' // TODO: replace with KV lookup

  if (!valid) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const res = new NextResponse(null, { status: 200 })
  res.cookies.set('session', 'mock-token', {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  })

  return res
}
