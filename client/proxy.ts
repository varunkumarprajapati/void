import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("void_access_token");
  const refreshToken = request.cookies.get("void_refresh_token");
  const hashTokens = !!(accessToken && refreshToken);

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute && !hashTokens) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hashTokens && isPublicRoute) {
    return NextResponse.redirect(new URL("/map", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|public|favicon.ico).*)"],
};
