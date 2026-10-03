import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pakistan-medical.vercel.app';

  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Disallow: /api/auth

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
