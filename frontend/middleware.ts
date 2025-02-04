import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client_revalidate_path } from '@/app/login/client_revalidate_path';
import { revalidatePath } from 'next/cache';
export function middleware(request: NextRequest) {
  let res = NextResponse.next()
  const isAuthenticated = request.headers.get("cookie")?.includes('csrftoken')
  let isLoginPage = request.nextUrl.pathname.startsWith('/login');
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(`${process.env.URL}/login`); // Redirect to the login page
  }
  if (request.nextUrl.pathname.startsWith('/logout')) {
    res.cookies.delete('csrftoken');
    res.cookies.delete('user');
  }
  return res;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - signup, reset-password
     */
    '/((?!api|_next/static|signup|reset-password|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}