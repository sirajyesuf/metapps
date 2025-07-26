'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import Hero from '@/components/Hero';
import { Tool } from '@/lib/tools-manager';

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch only active tools
    fetch('/api/tools?status=active')
      .then(res => res.json())
      .then(data => {
        setTools(data.tools || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tools:', error);
        setLoading(false);
      });
  }, []);

  const handleToolClick = (tool: Tool) => {
    // Navigate to the tool page
    router.push(tool.route);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tools...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
    <Hero/>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard 
              key={tool.id}
              tool={tool}
              onClick={() => handleToolClick(tool)}
            />
          ))}
        </div>
        
        {tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No active tools available at the moment.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
