import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  const routes = [
    '',
    '/about',
    '/services',
    '/packages',
    '/gallery',
    '/availability',
    '/book',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/availability' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/book' || route === '/availability' ? 0.9 : 0.8,
  }));
}
