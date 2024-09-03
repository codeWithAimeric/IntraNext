import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.redirect('/auth/register');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [], // Routes à protéger
};
