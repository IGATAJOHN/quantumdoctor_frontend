import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, isPublicPath, isProtectedPath, hasRouteAccess } from '@/lib/routes';

// Paths that should be ignored by middleware
const IGNORED_PATHS = [
  '/_next',
  '/api',
  '/static',
  '/images',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt'
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for ignored paths
  if (IGNORED_PATHS.some(prefix => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Get auth tokens and user role
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value as 'user' | 'doctor' | 'admin' | undefined;

  // Handle public paths
  if (isPublicPath(path)) {
    // If user is already authenticated, redirect to their dashboard
    if (token && userRole) {
      const dashboardPath = 
        userRole === 'user' ? ROUTES.USER.DASHBOARD :
        userRole === 'doctor' ? ROUTES.DOCTOR.DASHBOARD :
        userRole === 'admin' ? ROUTES.ADMIN.DASHBOARD :
        ROUTES.PUBLIC.HOME;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
    return NextResponse.next();
  }

  // Handle protected paths
  if (isProtectedPath(path)) {
    // Redirect to login if no token
    if (!token || !userRole) {
      const loginUrl = new URL(ROUTES.PUBLIC.LOGIN, request.url);
      loginUrl.searchParams.set('from', path);
      return NextResponse.redirect(loginUrl);
    }

    // Check role-based access
    if (!hasRouteAccess(path, userRole)) {
      // Redirect to appropriate dashboard
      const dashboardPath = 
        userRole === 'user' ? ROUTES.USER.DASHBOARD :
        userRole === 'doctor' ? ROUTES.DOCTOR.DASHBOARD :
        ROUTES.ADMIN.DASHBOARD;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    return NextResponse.next();
  }

  // For any other paths, show 404
  return NextResponse.rewrite(new URL(ROUTES.PUBLIC.NOT_FOUND, request.url));
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
