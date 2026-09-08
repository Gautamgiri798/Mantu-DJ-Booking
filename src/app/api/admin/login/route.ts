import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, hashPassword, createAdminSession, getAdminEnvCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const envCreds = getAdminEnvCredentials();
    const isEnvAdminEmail = cleanEmail === envCreds.email;

    let admin = await prisma.admin.findUnique({
      where: { email: cleanEmail },
    });

    // If admin is not yet in database but matches configured ADMIN_EMAIL from .env
    if (!admin && isEnvAdminEmail) {
      const activePassword = envCreds.password || 'admin123';
      if (password === activePassword) {
        const passwordHash = await hashPassword(activePassword);
        admin = await prisma.admin.create({
          data: {
            email: envCreds.email,
            name: 'Mantu (DJ Mantu)',
            passwordHash,
            role: 'OWNER',
          },
        });
      }
    }

    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin email or password.' }, { status: 401 });
    }

    // Determine password validity:
    // 1. If ADMIN_PASSWORD is set in .env and the email matches configured admin email,
    //    the .env password takes precedence.
    // 2. Otherwise verify against the database bcrypt hash.
    let isValid = false;

    if (isEnvAdminEmail && envCreds.password) {
      if (password === envCreds.password) {
        isValid = true;
        // Automatically sync the database password hash if it differs
        const matchesDbHash = await verifyPassword(password, admin.passwordHash);
        if (!matchesDbHash) {
          const updatedHash = await hashPassword(envCreds.password);
          await prisma.admin.update({
            where: { id: admin.id },
            data: { passwordHash: updatedHash },
          });
        }
      }
    } else {
      isValid = await verifyPassword(password, admin.passwordHash);
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin email or password.' }, { status: 401 });
    }

    // Create session cookie
    const token = await createAdminSession({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set('dj_mantu_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error during login' }, { status: 500 });
  }
}

