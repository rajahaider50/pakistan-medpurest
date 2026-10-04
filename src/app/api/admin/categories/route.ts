import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [categoriesRes, productsRes] = await Promise.all([
      supabaseAdmin
        .from('med_categories')
        .select('*')
        .order('sort_order', { ascending: true }),
      supabaseAdmin
        .from('med_products')
        .select('category_id')
    ]);

    if (categoriesRes.error) {
      return NextResponse.json({ error: categoriesRes.error.message }, { status: 500 });
    }

    // Count products per category
    const countMap: Record<string, number> = {};
    (productsRes.data || []).forEach(p => {
      if (p.category_id) {
        countMap[p.category_id] = (countMap[p.category_id] || 0) + 1;
      }
    });

    const categories = (categoriesRes.data || []).map(cat => ({
      ...cat,
      productCount: countMap[cat.id] || 0,
    }));

    return NextResponse.json({ categories });
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
    const { name, slug, parent_id, description, image_url, sort_order, featured, status } = body;

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const payload = {
      name,
      slug: generatedSlug,
      parent_id: parent_id || null,
      description: description || '',
      image_url: image_url || null,
      sort_order: Number(sort_order) || 0,
      featured: Boolean(featured),
      status: status || 'published',
    };

    const { data, error } = await supabaseAdmin
      .from('med_categories')
      .insert([payload])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, category: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
