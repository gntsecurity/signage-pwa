import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('session')?.value === 'mock-token'

  const adminPath = req.nextUrl.pathname.startsWith('/admin')

  if (adminPath && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
