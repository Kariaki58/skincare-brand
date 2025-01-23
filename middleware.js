import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { PublicRoutes, PrivateRoutes, AdminRoutes, authRoute } from './routes';

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
    async function middleware(req) {
        const { pathname } = req.nextUrl;

        // Check if the route is public, if so, allow access
        if (PublicRoutes.includes(pathname)) {
            return NextResponse.next();
        }

        // Get the token from the request
        const token = await getToken({ req, secret });

        // If token exists and user is trying to access the /auth route, redirect to home page
        if (token && pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // If no token, redirect to the authentication route
        if (!token) {
            if (pathname !== authRoute) {
                return NextResponse.redirect(new URL(authRoute, req.url));
            }
        }

        // If the user has a token but is trying to access private routes without the proper role, redirect to home
        if (PrivateRoutes.includes(pathname) && token.role !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // If the user has a token but is trying to access admin routes without the admin role, redirect to home
        if (AdminRoutes.includes(pathname) && token.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Otherwise, continue with the request
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
        '/((?!api|_next/static|_next/image|favicon.ico).|auth*)',
    ],
};
