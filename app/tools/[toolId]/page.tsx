import { Metadata } from 'next';
import { getToolById } from '@/lib/tools-manager';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import dynamic from 'next/dynamic';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ toolId: string }> }): Promise<Metadata> {
  const { toolId } = await params;
  const tool = await getToolById(toolId);
  
  if (!tool) {
    return {
      title: 'Tool Not Found - MetApps',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: `${tool.name} - MetApps`,
    description: tool.description,
    keywords: `${tool.name}, ${tool.category}, Ethiopian tools, ${toolId}`,
    openGraph: {
      title: `${tool.name} - MetApps`,
      description: tool.description,
      type: 'website',
      url: `https://metapps.com${tool.route}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - MetApps`,
      description: tool.description,
      images: [`/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}`],
    },
    alternates: {
      canonical: `https://metapps.com${tool.route}`,
    },
  };
}

// Generate static params for all tools
export async function generateStaticParams() {
  const { readToolsRegistry } = await import('@/lib/tools-manager');
  const registry = await readToolsRegistry();
  
  return registry.tools.map((tool) => ({
    toolId: tool.id,
  }));
}

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = await getToolById(toolId);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
            <p className="text-gray-600">The requested tool could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Dynamic import with SSR enabled for better SEO
  const ToolComponent = dynamic(() => import(`@/tools/${toolId}`), {
    loading: () => (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
    ssr: true, // Enable SSR for SEO
  });

  return (
    <>
      <StructuredData type="tool" tool={tool} />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8">
          <ToolComponent />
        </div>
        <Footer />
      </div>
    </>
  );
} 