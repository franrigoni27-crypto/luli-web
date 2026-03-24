import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes (except the login page itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
