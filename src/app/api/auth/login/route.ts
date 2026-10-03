import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashPassword, createAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const inputHash = await hashPassword(password);

    // Verify against Supabase med_admin_users
    let user = null;
    try {
      const { data } = await supabaseAdmin
        .from('med_admin_users')
        .select('*')
        .eq('email', email)
        .single();
      user = data;
    } catch (e) {
      console.warn('Database user query fallback');
    }

    // Default master admin credentials fallback:
    // admin@pakistanmedical.com / admin123
    const isMasterDefault =
      (email === 'admin@pakistanmedical.com' || email === 'admin@medpurest.com') &&
      password === 'admin123';

    if (!user && !isMasterDefault) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user && user.password_hash !== inputHash && !isMasterDefault) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const adminPayload = {
      id: user?.id || 'admin-master',
      email: user?.email || email,
      role: user?.role || 'super_admin',
      name: user?.full_name || 'Master Administrator',
    };

    const token = await createAdminToken(adminPayload);

    const response = NextResponse.json({
      success: true,
      user: adminPayload,
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
