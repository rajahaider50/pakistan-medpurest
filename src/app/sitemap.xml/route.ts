import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pakistan-medical.vercel.app';

  const staticPages = [
    '',
    '/products',
    '/products/protective-equipment',
    '/products/protective-equipment/sms-sterile-surgical-gown-reinforced',
    '/products/protective-equipment/disposable-isolation-suit-coverall',
    '/products/surgical-pack',
    '/products/surgical-pack/cesarean-section-c-section-surgical-pack',
    '/products/surgical-pack/universal-laparotomy-general-surgery-pack',
    '/products/cleaning-and-disinfection-series',
    '/products/cleaning-and-disinfection-series/biofilm-removal-multi-enzyme-cleaner-858',
    '/products/cleaning-and-disinfection-series/phthalaldehyde-opa-high-level-disinfectant',
    '/products/surgical-drapes',
    '/about',
    '/about/history',
    '/about/certification',
    '/about/honor',
    '/about/culture',
    '/news',
    '/blog',
    '/video',
    '/certificate',
    '/contact-us',
    '/privacy-policy',
    '/sitemap',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(route => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '' ? '1.0' : route.startsWith('/products') ? '0.9' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
