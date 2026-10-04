import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Query exact counts and recent data from Supabase in parallel
    const [
      productsRes,
      categoriesRes,
      newsRes,
      blogsRes,
      certsRes,
      videosRes,
      totalInquiriesRes,
      newInquiriesRes,
      recentInquiriesRes,
    ] = await Promise.all([
      supabaseAdmin.from('med_products').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_categories').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_news').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_blogs').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_certificates').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_videos').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_inquiries').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabaseAdmin.from('med_inquiries').select('*').order('created_at', { ascending: false }).limit(6),
    ]);

    return NextResponse.json({
      stats: {
        products: productsRes.count ?? 0,
        categories: categoriesRes.count ?? 0,
        news: newsRes.count ?? 0,
        blogs: blogsRes.count ?? 0,
        certificates: certsRes.count ?? 0,
        videos: videosRes.count ?? 0,
        inquiries: totalInquiriesRes.count ?? 0,
        newInquiries: newInquiriesRes.count ?? 0,
      },
      recentInquiries: recentInquiriesRes.data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
