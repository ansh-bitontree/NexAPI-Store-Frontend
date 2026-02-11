import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/user"];
  const authRoutes = ["/login", "/signup", "/forgotPassword", "/reset-password"];

  const isProtectedRoute = protectedRoutes.some(
    route => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = authRoutes.some(route => pathname === route);

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgotPassword",   
    "/dashboard/:path*",
    "/user/:path*",
    "/reset-password/:path*",
  ],
};
