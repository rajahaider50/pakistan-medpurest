import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch products and categories to map names
    const [productsRes, categoriesRes] = await Promise.all([
      supabaseAdmin
        .from('med_products')
        .select('*')
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('med_categories')
        .select('id, name, slug')
    ]);

    if (productsRes.error) {
      return NextResponse.json({ error: productsRes.error.message }, { status: 500 });
    }

    const categoriesMap = new Map((categoriesRes.data || []).map(c => [c.id, c]));

    const products = (productsRes.data || []).map(p => {
      const cat = p.category_id ? categoriesMap.get(p.category_id) : null;
      return {
        ...p,
        category: cat ? cat.name : 'Uncategorized',
        categorySlug: cat ? cat.slug : 'uncategorized',
        link: cat && p.slug ? `/products/${cat.slug}/${p.slug}` : `/products`,
      };
    });

    return NextResponse.json({ products });
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
    const {
      name,
      sku,
      category_id,
      slug,
      short_description,
      description,
      features,
      specifications,
      applications,
      packaging,
      sterilization,
      primary_image,
      images,
      status,
      featured,
      sort_order,
    } = body;

    if (!name || !sku) {
      return NextResponse.json(
        { error: 'Product name and SKU are required.' },
        { status: 400 }
      );
    }

    // Auto-generate slug if omitted
    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const productPayload = {
      name,
      sku,
      slug: generatedSlug,
      category_id: category_id || null,
      short_description: short_description || '',
      description: description || '',
      features: Array.isArray(features) ? features : [],
      specifications: specifications && typeof specifications === 'object' ? specifications : {},
      applications: Array.isArray(applications) ? applications : [],
      packaging: packaging || '',
      sterilization: sterilization || 'Ethylene Oxide (EO Gas)',
      primary_image: primary_image || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      images: Array.isArray(images) && images.length > 0 ? images : [primary_image],
      status: status || 'published',
      featured: Boolean(featured),
      sort_order: Number(sort_order) || 0,
      views: 0,
    };

    const { data, error } = await supabaseAdmin
      .from('med_products')
      .insert([productPayload])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
