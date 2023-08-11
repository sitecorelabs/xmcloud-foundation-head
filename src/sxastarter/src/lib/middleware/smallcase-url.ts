import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { GetServerSideProps } from 'next';

export function smallcaseurl(req: NextRequest): NextResponse {
  const { pathname, origin } = req.nextUrl;
  console.log(req, 'Rehmo');
  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(origin + pathname.toLowerCase()), 308);
}
