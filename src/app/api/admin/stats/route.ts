import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Query counts from Supabase
    const [productsRes, categoriesRes, inquiriesRes, newsRes, certsRes] = await Promise.all([
      supabaseAdmin.from('med_products').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_categories').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_inquiries').select('*').order('created_at', { ascending: false }).limit(5),
      supabaseAdmin.from('med_news').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('med_certificates').select('id', { count: 'exact', head: true }),
    ]);

    // Inquiry status count
    const { count: totalInquiries } = await supabaseAdmin
      .from('med_inquiries')
      .select('id', { count: 'exact', head: true });

    const { count: newInquiries } = await supabaseAdmin
      .from('med_inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new');

    return NextResponse.json({
      stats: {
        products: productsRes.count || 6,
        categories: categoriesRes.count || 14,
        inquiries: totalInquiries || 0,
        newInquiries: newInquiries || 0,
        news: newsRes.count || 3,
        certificates: certsRes.count || 5,
      },
      recentInquiries: inquiriesRes.data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
