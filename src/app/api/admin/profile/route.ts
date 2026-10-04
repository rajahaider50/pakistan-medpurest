import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin, hashPassword } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data } = await supabaseAdmin
      .from('med_admin_users')
      .select('id, email, full_name, role, status, created_at, last_login_at')
      .eq('email', admin.email)
      .single();

    return NextResponse.json({
      admin: data || {
        id: admin.id,
        email: admin.email,
        full_name: admin.name,
        role: admin.role,
        status: 'active',
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { full_name, email, current_password, new_password } = body;

    // If changing password, verify current password first
    if (new_password) {
      if (!current_password) {
        return NextResponse.json({ error: 'Current password is required to set a new password' }, { status: 400 });
      }

      if (new_password.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
      }

      const { data: user } = await supabaseAdmin
        .from('med_admin_users')
        .select('*')
        .eq('email', admin.email)
        .single();

      const currentHash = await hashPassword(current_password);

      // Check current password
      const isDefault = current_password === 'admin123';
      const matchesDB = user && user.password_hash === currentHash;

      if (!matchesDB && !isDefault) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      const newHash = await hashPassword(new_password);

      if (user) {
        await supabaseAdmin
          .from('med_admin_users')
          .update({
            password_hash: newHash,
            full_name: full_name || user.full_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      } else {
        // Create user record in med_admin_users if was using default fallback
        await supabaseAdmin
          .from('med_admin_users')
          .insert([{
            email: email || admin.email,
            password_hash: newHash,
            full_name: full_name || admin.name,
            role: 'super_admin',
            status: 'active',
          }]);
      }

      return NextResponse.json({ success: true, message: 'Password updated successfully' });
    }

    // Just update name
    if (full_name) {
      await supabaseAdmin
        .from('med_admin_users')
        .update({
          full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('email', admin.email);
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
