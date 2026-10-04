import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('med_site_settings')
      .select('*')
      .order('key', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const settingsObj: Record<string, string> = {};
    (data || []).forEach(item => {
      settingsObj[item.key] = item.value;
    });

    return NextResponse.json({
      settings: settingsObj,
      raw: data || [],
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
    const settings = body.settings || body;

    // settings is an object of key => value
    const updatePromises = Object.entries(settings).map(async ([key, value]) => {
      return supabaseAdmin
        .from('med_site_settings')
        .upsert(
          { key, value: String(value), updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
