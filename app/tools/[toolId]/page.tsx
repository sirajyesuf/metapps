'use client';

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
}

export default function ToolPage({ params }: ToolPageProps) {
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tool data from API
    const fetchTool = async () => {
      try {
        const { toolId } = await params;
        const response = await fetch(`/api/tools/${toolId}`);
        const data = await response.json();
        
        if (data.tool && data.tool.isActive && data.tool.isWorking) {
          setTool(data.tool);
        } else {
          notFound();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tool:', error);
        notFound();
      }
    };

    fetchTool();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tool...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    notFound();
  }

  // Dynamic import of the tool component
  const ToolComponent = dynamic(async () => {
    const { toolId } = await params;
    return import(`@/tools/${toolId}`);
  }, {
    loading: () => (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tool...</p>
        </div>
      </div>
    ),
    ssr: false
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
            <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
          
          <p className="text-gray-600 text-lg mb-4">{tool.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Category: {tool.category}</span>
            <span>•</span>
            <span>Difficulty: {tool.difficulty}</span>
            <span>•</span>
            <span>Rating: {tool.rating}/5</span>
          </div>
        </div>
        
        <ToolComponent />
      </div>
      
      <Footer />
    </div>
  );
} 