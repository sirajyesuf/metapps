'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Tool } from '@/lib/tools-manager';

export default function ToolPage() {
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const toolId = params.toolId as string;
        const response = await fetch(`/api/tools/${toolId}`);
        
        if (!response.ok) {
          throw new Error('Tool not found');
        }
        
        const data = await response.json();
        setTool(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tool');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [params.toolId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tool...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600">{error || 'The requested tool could not be found.'}</p>
        </div>
      </div>
    );
  }

  // Dynamically import the tool component
  const ToolComponent = dynamic(() => import(`@/tools/${tool.id}`), {
    loading: () => (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
    ssr: false
  });

  return <ToolComponent />;
} 