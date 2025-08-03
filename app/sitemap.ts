import { MetadataRoute } from 'next';
import { readToolsRegistry } from '@/lib/tools-manager';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://metapps.com';
  
  // Get all tools from registry
  const registry = await readToolsRegistry();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.3,
    },
  ];

  // Tool pages
  const toolPages = registry.tools
    .filter(tool => tool.isActive && tool.isWorking)
    .map(tool => ({
      url: `${baseUrl}${tool.route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticPages, ...toolPages];
} 