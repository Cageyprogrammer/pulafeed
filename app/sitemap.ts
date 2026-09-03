import type {MetadataRoute} from 'next';

export const dynamic = 'force-static';

export default function sitemap():MetadataRoute.Sitemap{
  const base='https://pulafeed.com';
  return [
    '',
    'about',
    'platform',
    'farmers',
    'businesses',
    'impact',
    'partners',
    'blog',
    'contact',
  ].map(path => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
