import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Supabase session auth token in cookies
  const hasSessionCookie = Array.from(request.cookies.getAll()).some(
    (cookie) => cookie.name.includes('auth-token') || cookie.name.includes('sb-')
  );

  const isProtectedPage =
    pathname === '/generate' ||
    pathname.startsWith('/editor') ||
    pathname === '/presentations' ||
    pathname === '/settings';

  // Protected routes require session. If unauthenticated, redirect to sign-in with return URL
  if (isProtectedPage && !hasSessionCookie) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Public landing page / and all public sections pass through normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/generate',
    '/editor/:path*',
    '/presentations',
    '/settings',
  ],
};
