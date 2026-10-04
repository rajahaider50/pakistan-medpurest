import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    let query = supabase
      .from('med_products')
      .select('*, med_categories(id, name, slug)')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (category && category !== 'all') {
      // Find category id by slug first
      const { data: catData } = await supabase
        .from('med_categories')
        .select('id')
        .eq('slug', category)
        .single();

      if (catData) {
        query = query.eq('category_id', catData.id);
      }
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,short_description.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
