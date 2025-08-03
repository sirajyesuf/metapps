import { Tool } from '@/lib/tools-manager';

interface StructuredDataProps {
  tool?: Tool;
  type?: 'homepage' | 'tool';
}

export default function StructuredData({ tool, type = 'homepage' }: StructuredDataProps) {
  if (type === 'tool' && tool) {
    const toolStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.description,
      url: `https://metapps.com${tool.route}`,
      applicationCategory: tool.category,
      operatingSystem: 'Web Browser',
      browserRequirements: 'Requires JavaScript',
      author: {
        '@type': 'Organization',
        name: tool.author,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating,
        ratingCount: Math.floor(tool.rating * 10),
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
    );
  }

  // Homepage structured data
  const homepageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MetApps',
    description: 'Ethiopian Tools & Utilities - A collection of Ethiopian-focused tools including Amharic alphabet, Geez converters, timezone converter, and cultural utilities.',
    url: 'https://metapps.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://metapps.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetApps',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metapps.com/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
    />
  );
} 