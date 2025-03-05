import { NextResponse } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("__Secure-next-auth.session-token")?.value;
  console.log(token);

  const { pathname } = request.nextUrl;

  if (!token) {
    // Kalau nggak ada token, arahkan ke login
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (token){
    if (pathname === "/login") {
      // Kalau ada token, tapi user akses halaman login, arahkan ke dashboard
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
 

}

export const config = {
  matcher: ["/login", "/profile/:path*"],
};
