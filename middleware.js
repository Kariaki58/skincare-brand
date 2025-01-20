import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname)
        console.log(req.nextauth.token.role)
        
        if (req.nextUrl.pathname.startsWith("/dashboard/user") && req.nextauth.token.role !== "user") {
            return NextResponse.redirect(new URL("/dashboard/admin", req.nextUrl));
        }
        if (req.nextUrl.pathname.startsWith("/dashboard/admin") && req.nextauth.token.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard/user", req.nextUrl));
        }
    },
    {
        callbacks: {
            authorized: ({token}) => !!token
        }
    }
)

export const config = {
    matcher: ["/dashboard/:path*"]
};
