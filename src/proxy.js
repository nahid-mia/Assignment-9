import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';


export async function proxy(request) {

    const { pathname } = request.nextUrl;

    if (pathname === '/ideas') {
        return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();

}


export const config = {
    matcher: ['/ideas/:path*', '/add-idea', '/profile', '/profile-manage', '/my-interactions', '/my-ideas'],
}