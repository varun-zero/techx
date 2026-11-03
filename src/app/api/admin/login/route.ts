import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createSessionToken } from '@/lib/admin-auth';

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (
    !configuredUsername ||
    !configuredPassword ||
    username !== configuredUsername ||
    password !== configuredPassword
  ) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createSessionToken(username),
    httpOnly: true,
    sameSite: 'lax',
    secure: new URL(request.url).protocol === 'https:',
    path: '/',
    maxAge: 12 * 60 * 60,
  });
  return response;
}
