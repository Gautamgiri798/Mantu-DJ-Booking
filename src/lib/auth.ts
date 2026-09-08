import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dj-mantu-ultra-secure-session-key-2026-event-booking'
);

const COOKIE_NAME = 'dj_mantu_admin_session';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Dynamically resolves the admin credentials from .env and process.env.
 * Reading directly from the .env file ensures immediate updates whenever
 * the admin password is changed in .env, without requiring a server restart.
 */
export function getAdminEnvCredentials(): { email: string; password?: string } {
  let email = process.env.ADMIN_EMAIL || 'admin@djmantu.com';
  let password = process.env.ADMIN_PASSWORD;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const passMatch = content.match(/^ADMIN_PASSWORD\s*=\s*["']?(.*?)["']?\s*$/m);
      if (passMatch && passMatch[1] !== undefined) {
        password = passMatch[1].trim();
      }
      const emailMatch = content.match(/^ADMIN_EMAIL\s*=\s*["']?(.*?)["']?\s*$/m);
      if (emailMatch && emailMatch[1] !== undefined) {
        email = emailMatch[1].trim();
      }
    }
  } catch {
    // Fall back to process.env values
  }

  return {
    email: email.toLowerCase().trim(),
    password: password || undefined,
  };
}

export interface AdminSessionPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

export async function createAdminSession(admin: AdminSessionPayload): Promise<string> {
  const token = await new SignJWT({ ...admin })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return token;
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

