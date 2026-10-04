import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [histRes, cultRes, honRes] = await Promise.all([
      supabaseAdmin.from('med_company_history').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('med_company_culture').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('med_honors').select('*').order('sort_order', { ascending: true }),
    ]);

    return NextResponse.json({
      history: histRes.data || [],
      culture: cultRes.data || [],
      honors: honRes.data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { section, data } = body;

    let table = '';
    if (section === 'history') table = 'med_company_history';
    else if (section === 'culture') table = 'med_company_culture';
    else if (section === 'honors') table = 'med_honors';
    else {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const { data: inserted, error } = await supabaseAdmin
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: inserted });
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
    const { section, id, data } = body;

    let table = '';
    if (section === 'history') table = 'med_company_history';
    else if (section === 'culture') table = 'med_company_culture';
    else if (section === 'honors') table = 'med_honors';
    else {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const { data: updated, error } = await supabaseAdmin
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');
    const id = searchParams.get('id');

    if (!id || !section) {
      return NextResponse.json({ error: 'Section and ID are required' }, { status: 400 });
    }

    let table = '';
    if (section === 'history') table = 'med_company_history';
    else if (section === 'culture') table = 'med_company_culture';
    else if (section === 'honors') table = 'med_honors';
    else {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Item deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
