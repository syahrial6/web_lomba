import { NextResponse } from "next/server";



export function middleware(request) {
    const cookie = request.cookies.get("next-auth.session-token")
    if (!cookie){
    return NextResponse.redirect(new URL('/login', request.url))
    }
  }

export const config = {
    matcher: '/profile/:path*',
  }