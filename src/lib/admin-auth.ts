import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET must be configured');
  return secret;
}

export function createSessionToken(username: string): string {
  const payload = Buffer.from(`${username}:${Date.now()}`).toString('base64url');
  const signature = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const separator = token.lastIndexOf('.');
  if (separator <= 0) return null;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expected = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  const actualBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  if (
    actualBytes.length !== expectedBytes.length ||
    !timingSafeEqual(actualBytes, expectedBytes)
  ) {
    return null;
  }

  const decoded = Buffer.from(payload, 'base64url').toString('utf8');
  const split = decoded.lastIndexOf(':');
  if (split <= 0) return null;
  const issuedAt = Number(decoded.slice(split + 1));
  if (!Number.isFinite(issuedAt) || issuedAt > Date.now() || Date.now() - issuedAt >= SESSION_TTL_MS) {
    return null;
  }
  return decoded.slice(0, split);
}
