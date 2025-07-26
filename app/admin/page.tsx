'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  isWorking: boolean;
  route: string;
  icon: string;
  rating: number;
  version: string;
  author: string;
}

interface ToolRegistry {
  lastUpdated: string;
  totalTools: number;
  activeTools: number;
  workingTools: number;
  tools: Tool[];
}

export default function AdminPage() {
  const [registry, setRegistry] = useState<ToolRegistry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTool, setEditingTool] = useState<string | null>(null);
  const [newTool, setNewTool] = useState<Partial<Tool>>({
    id: '',
    name: '',
    description: '',
    category: '',
    isActive: true,
    isWorking: true,
    route: '',
    icon: 'Circle',
    rating: 4.0,
    version: '1.0.0',
    author: 'MetApps'
  });

  useEffect(() => {
    loadRegistry();
  }, []);

  const loadRegistry = async () => {
    try {
      const response = await fetch('/api/tools');
      const data = await response.json();
      setRegistry(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading registry:', error);
      setLoading(false);
    }
  };

  const saveRegistry = async () => {
    if (!registry) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/registry', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registry)
      });

      if (response.ok) {
        alert('Registry saved successfully!');
        await loadRegistry();
      } else {
        alert('Error saving registry');
      }
    } catch (error) {
      console.error('Error saving registry:', error);
      alert('Error saving registry');
    } finally {
      setSaving(false);
    }
  };

  const toggleToolStatus = (toolId: string, field: 'isActive' | 'isWorking') => {
    if (!registry) return;
    
    setRegistry(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tools: prev.tools.map(tool => 
          tool.id === toolId 
            ? { ...tool, [field]: !tool[field] }
            : tool
        )
      };
    });
  };

  const addNewTool = () => {
    if (!registry || !newTool.id || !newTool.name) {
      alert('Please fill in tool ID and name');
      return;
    }

    if (registry.tools.find(t => t.id === newTool.id)) {
      alert('Tool with this ID already exists');
      return;
    }

    const tool: Tool = {
      id: newTool.id!,
      name: newTool.name!,
      description: newTool.description || '',
      category: newTool.category || 'Utilities',
      isActive: newTool.isActive || true,
      isWorking: newTool.isWorking || true,
      route: newTool.route || `/tools/${newTool.id}`,
      icon: newTool.icon || 'Circle',
      rating: newTool.rating || 4.0,
      version: newTool.version || '1.0.0',
      author: newTool.author || 'MetApps'
    };

    setRegistry(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tools: [...prev.tools, tool]
      };
    });

    setNewTool({
      id: '',
      name: '',
      description: '',
      category: '',
      isActive: true,
      isWorking: true,
      route: '',
      icon: 'Circle',
      rating: 4.0,
      version: '1.0.0',
      author: 'MetApps'
    });
  };

  const removeTool = (toolId: string) => {
    if (!registry) return;
    
    if (confirm(`Are you sure you want to remove tool "${toolId}"?`)) {
      setRegistry(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          tools: prev.tools.filter(tool => tool.id !== toolId)
        };
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading registry...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!registry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-16">
          <p className="text-red-600">Failed to load registry</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage tools registry</p>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={loadRegistry}
                variant="outline"
                className="flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={saveRegistry}
                disabled={saving}
                className="flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Registry'}
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{registry.totalTools}</div>
              <div className="text-sm text-blue-600">Total Tools</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{registry.activeTools}</div>
              <div className="text-sm text-green-600">Active Tools</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{registry.workingTools}</div>
              <div className="text-sm text-yellow-600">Working Tools</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{registry.lastUpdated}</div>
              <div className="text-sm text-gray-600">Last Updated</div>
            </div>
          </div>

          {/* Add New Tool */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Add New Tool</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Tool ID"
                value={newTool.id}
                onChange={(e) => setNewTool(prev => ({ ...prev, id: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Tool Name"
                value={newTool.name}
                onChange={(e) => setNewTool(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Category"
                value={newTool.category}
                onChange={(e) => setNewTool(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTool.description}
                onChange={(e) => setNewTool(prev => ({ ...prev, description: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Route"
                value={newTool.route}
                onChange={(e) => setNewTool(prev => ({ ...prev, route: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <Button onClick={addNewTool} className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Tool
              </Button>
            </div>
          </div>

          {/* Tools List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tools</h3>
            {registry.tools.map((tool) => (
              <div key={tool.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-lg font-semibold">{tool.name}</h4>
                      <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{tool.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>ID: {tool.id}</span>
                      <span>Route: {tool.route}</span>
                      <span>Rating: {tool.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-6">
                    {/* Active Toggle */}
                    <div className="text-center">
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Active
                      </label>
                      <button
                        onClick={() => toggleToolStatus(tool.id, 'isActive')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          tool.isActive ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            tool.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Working Toggle */}
                    <div className="text-center">
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Working
                      </label>
                      <button
                        onClick={() => toggleToolStatus(tool.id, 'isWorking')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          tool.isWorking ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            tool.isWorking ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      onClick={() => removeTool(tool.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    tool.isActive && tool.isWorking ? 'bg-green-500' : 
                    tool.isActive ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-xs text-gray-500">
                    {tool.isActive && tool.isWorking ? 'Active & Working' : 
                     tool.isActive ? 'Active but not working' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 