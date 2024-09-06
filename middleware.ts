import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth"


export default auth((req) => {
  // const session = await getSession({ req });
  
  // if (!session) {
  //   return NextResponse.redirect('/auth/login');
  // }

  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ['/c/home/:path*'], 
};

export { auth as middleware } from "@/auth"