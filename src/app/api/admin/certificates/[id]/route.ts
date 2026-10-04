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
      .from('med_certificates')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ certificate: data });
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

    const updatePayload: Record<string, any> = {};

    if (body.title !== undefined) updatePayload.title = body.title;
    if (body.cert_number !== undefined) updatePayload.cert_number = body.cert_number;
    if (body.issuing_authority !== undefined) updatePayload.issuing_authority = body.issuing_authority;
    if (body.issue_date !== undefined) updatePayload.issue_date = body.issue_date;
    if (body.expiry_date !== undefined) updatePayload.expiry_date = body.expiry_date;
    if (body.image_url !== undefined) updatePayload.image_url = body.image_url;
    if (body.sort_order !== undefined) updatePayload.sort_order = Number(body.sort_order) || 0;
    if (body.status !== undefined) updatePayload.status = body.status;

    const { data, error } = await supabaseAdmin
      .from('med_certificates')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, certificate: data });
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
      .from('med_certificates')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Certificate deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
