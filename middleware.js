import { NextResponse } from 'next/server';

const protectedRoutes = ['/lab', '/dashboard', '/settings'];
const authRoutes = ['/login', '/register'];

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL('/lab', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/lab/:path*', '/dashboard/:path*', '/settings/:path*', '/login', '/register'],
};
