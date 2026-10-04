import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { data, error } = await supabaseAdmin
      .from('med_products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.name !== undefined) updatePayload.name = body.name;
    if (body.sku !== undefined) updatePayload.sku = body.sku;
    if (body.slug !== undefined) updatePayload.slug = body.slug;
    if (body.category_id !== undefined) updatePayload.category_id = body.category_id || null;
    if (body.short_description !== undefined) updatePayload.short_description = body.short_description;
    if (body.description !== undefined) updatePayload.description = body.description;
    if (body.features !== undefined) updatePayload.features = Array.isArray(body.features) ? body.features : [];
    if (body.specifications !== undefined) updatePayload.specifications = body.specifications;
    if (body.applications !== undefined) updatePayload.applications = Array.isArray(body.applications) ? body.applications : [];
    if (body.packaging !== undefined) updatePayload.packaging = body.packaging;
    if (body.sterilization !== undefined) updatePayload.sterilization = body.sterilization;
    if (body.primary_image !== undefined) updatePayload.primary_image = body.primary_image;
    if (body.images !== undefined) updatePayload.images = Array.isArray(body.images) ? body.images : [body.primary_image];
    if (body.status !== undefined) updatePayload.status = body.status;
    if (body.featured !== undefined) updatePayload.featured = Boolean(body.featured);
    if (body.sort_order !== undefined) updatePayload.sort_order = Number(body.sort_order) || 0;

    const { data, error } = await supabaseAdmin
      .from('med_products')
      .update(updatePayload)
      .eq('id', id)
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { error } = await supabaseAdmin
      .from('med_products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
