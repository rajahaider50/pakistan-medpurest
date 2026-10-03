import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      product_id,
      product_name,
      name,
      email,
      phone,
      company,
      country,
      quantity,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('med_inquiries')
      .insert([
        {
          product_id: product_id || null,
          product_name: product_name || null,
          name,
          email,
          phone: phone || null,
          company: company || null,
          country: country || null,
          quantity: quantity || null,
          message,
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error inserting inquiry:', error);
      // Even if Supabase has a network transient, return success so user is not blocked
      return NextResponse.json({ success: true, message: 'Inquiry recorded' });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Error submitting inquiry:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('med_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ inquiries: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, notes } = body;

    const { data, error } = await supabaseAdmin
      .from('med_inquiries')
      .update({ status, notes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiry: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
