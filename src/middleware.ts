import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({req: request})
  const url = request.nextUrl

  if (token && (
    url.pathname.startsWith("/login") || url.pathname.startsWith("/register")
  )) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

}

export const config = {
  matcher: ["/login", "/dashboard", "/register"],
};
