import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Protect all /portal routes EXCEPT /portal/login
  const isPortalRoute = path.startsWith('/portal');
  const isLoginRoute = path === '/portal/login';

  // Check for a mock authentication cookie
  // In a real app, this would check a JWT or Sanctum session cookie
  const isAuthenticated = request.cookies.has('auth_token');

  if (isPortalRoute && !isLoginRoute && !isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL('/portal/login', request.url));
  }

  if (isLoginRoute && isAuthenticated) {
    // Redirect authenticated users away from the login page
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
