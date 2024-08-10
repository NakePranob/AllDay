import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const user = await getToken({ req: request })
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    const userRoleId = user.roleId;
    const url = request.nextUrl.pathname;

    if (url.startsWith('/menage')) {
        if (userRoleId === '2' || userRoleId === '3') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/registerEntrepreneur', request.url));
        }
    }

    if (url.startsWith('/admin')) {
        if (userRoleId === '3') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}
 
export const config = {
    matcher: ['/menage/:path*', '/admin/:path*'],
}