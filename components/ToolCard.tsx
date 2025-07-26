'use client';

import { LucideIcon, icons } from 'lucide-react';
import { Star } from 'lucide-react';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    rating: number;
    route: string;
  };
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  // Get icon component dynamically
  const IconComponent = icons[tool.icon as keyof typeof icons] || icons.Circle;

  // Get icon color based on category
  const getIconColor = (category: string) => {
    switch (category) {
      case 'Games & Learning':
        return 'text-purple-600';
      case 'Utilities':
        return 'text-blue-600';
      case 'Language Tools':
        return 'text-green-600';
      case 'Finance Tools':
        return 'text-yellow-600';
      case 'Cultural Tools':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header with Icon and Rating */}
        <div className="flex items-start justify-between mb-4">
          <IconComponent className={`w-8 h-8 ${getIconColor(tool.category)}`} />
          <div className="text-right">
            <div className="flex items-center text-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
              <span className="text-gray-700 font-medium">{tool.rating}</span>
            </div>
          </div>
        </div>

        {/* Tool Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {tool.name}
        </h3>

        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tool.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {tool.description}
        </p>

        {/* Launch Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
        >
          <span className="mr-2">▷</span>
          Launch Tool
        </button>
      </div>
    </div>
  );
} 