import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'pakistan-medical-secret-key-secure-2026-b2b'
);

export async function createAdminToken(payload: { id: string; email: string; role: string; name: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { id: string; email: string; role: string; name: string };
  } catch (error) {
    return null;
  }
}

export async function getCurrentAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

// Simple deterministic hash for password checking (SHA-256)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
