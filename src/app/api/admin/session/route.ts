import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/admin-auth';

export function GET(request: NextRequest) {
  const username = verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  if (!username) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, username });
}
