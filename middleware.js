import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { PublicRoutes, PrivateRoutes, AdminRoutes, authRoute } from './routes';

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
    async function middleware(req) {
        const { pathname } = req.nextUrl;

        if (PublicRoutes.includes(pathname)) {
            return NextResponse.next();
        }

        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.redirect(new URL(authRoute, req.url));
        }

        if (PrivateRoutes.includes(pathname) && token.role !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if (AdminRoutes.includes(pathname) && token.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl;
                if (PublicRoutes.includes(pathname)) {
                    return true;
                }
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
    ],
};
