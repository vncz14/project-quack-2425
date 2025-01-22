import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client_revalidate_path } from '@/app/login/client_revalidate_path';
import { revalidatePath } from 'next/cache';
export function middleware(request: NextRequest) {
  let response = NextResponse.next()

  if (request.nextUrl.pathname.startsWith('/logout')) {
    response.cookies.delete('csrftoken');
    response.cookies.delete('user');
  }
  return response;
}
// export function middleware(request: NextRequest) {
//   const isAuthenticated = request.headers.get("cookie")?.includes('csrftoken')
//   if (!isAuthenticated) {
//     return NextResponse.redirect(`${process.env.URL}/login`); // Redirect to the login page
//   }
//   return NextResponse.next(); // Go to requested path
// }
// export const config = {
//   matcher: [
//     '/((?!login|signup|reset-password|_next/static|_next/image|$|.*\\.png$).*)', 
//     '/$',
//   ]
// }