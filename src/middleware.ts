import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/api/login'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // For calculator page, check user role
  if (pathname === '/calculator') {
    // Get user role from token
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'user' && payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/calculator/:path*', '/admin/:path*', '/login'],
}; 