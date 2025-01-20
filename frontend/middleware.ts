import { hasCookie } from 'cookies-next/client'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.headers.get("cookie")?.includes('csrftoken')
  if (!isAuthenticated) {
    return NextResponse.redirect(`${process.env.URL}/login`); // Redirect to the login page
  }
  return NextResponse.next(); // Go to requested path
}
export const config = {
  matcher: [
    '/((?!login|signup|reset-password|_next/static|_next/image|$|.*\\.png$).*)', 
    '/$',
  ]
}