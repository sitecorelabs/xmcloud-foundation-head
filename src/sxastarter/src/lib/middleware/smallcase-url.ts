import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function smallcaseurl(req: NextRequest): NextResponse {
  const { pathname, origin } = req.nextUrl;
  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(origin + pathname.toLowerCase()), 308);
}
