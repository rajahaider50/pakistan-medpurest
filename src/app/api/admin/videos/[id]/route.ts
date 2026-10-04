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
      .from('med_videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ video: data });
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
    if (body.slug !== undefined) updatePayload.slug = body.slug;
    if (body.video_url !== undefined) updatePayload.video_url = body.video_url;
    if (body.thumbnail_url !== undefined) updatePayload.thumbnail_url = body.thumbnail_url;
    if (body.duration !== undefined) updatePayload.duration = body.duration;
    if (body.description !== undefined) updatePayload.description = body.description;
    if (body.sort_order !== undefined) updatePayload.sort_order = Number(body.sort_order) || 0;
    if (body.status !== undefined) updatePayload.status = body.status;

    const { data, error } = await supabaseAdmin
      .from('med_videos')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, video: data });
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
      .from('med_videos')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Video deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
