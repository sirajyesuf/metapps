'use client';

import { Star, Circle, Gamepad2, Calendar, Keyboard, Calculator, BookOpen, Heart, Timer } from 'lucide-react';
import { Tool } from '@/lib/tools-manager';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  // Get icon component based on tool.icon
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Gamepad2,
      Calendar,
      Keyboard,
      Calculator,
      BookOpen,
      Heart,
      Timer,
      Circle
    };
    return iconMap[iconName] || Circle;
  };

  const IconComponent = getIconComponent(tool.icon);

  // Get icon color based on category
  const getIconColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'games & learning':
        return 'text-purple-600';
      case 'utilities':
        return 'text-blue-600';
      case 'language tools':
        return 'text-green-600';
      case 'finance tools':
        return 'text-yellow-600';
      case 'cultural tools':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getIconColor(tool.category).replace('text-', 'bg-').replace('-600', '-100')}`}>
          <IconComponent className={`w-6 h-6 ${getIconColor(tool.category)}`} />
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-600">{tool.rating}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {tool.category}
        </span>
      </div>
    </div>
  );
} 