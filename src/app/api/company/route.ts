import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const [histRes, cultRes, honRes] = await Promise.all([
      supabase.from('med_company_history').select('*').order('sort_order', { ascending: true }),
      supabase.from('med_company_culture').select('*').order('sort_order', { ascending: true }),
      supabase.from('med_honors').select('*').order('sort_order', { ascending: true }),
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
