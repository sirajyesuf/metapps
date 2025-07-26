import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

interface ToolsRegistry {
  lastUpdated: string;
  totalTools: number;
  activeTools: number;
  workingTools: number;
  tools: Tool[];
}

export async function PUT(request: NextRequest) {
  try {
    const registry: ToolsRegistry = await request.json();
    
    // Validate the registry structure
    if (!registry.tools || !Array.isArray(registry.tools)) {
      return NextResponse.json({ error: 'Invalid registry structure' }, { status: 400 });
    }

    // Update counts
    registry.totalTools = registry.tools.length;
    registry.activeTools = registry.tools.filter(tool => tool.isActive).length;
    registry.workingTools = registry.tools.filter(tool => tool.isWorking).length;
    registry.lastUpdated = new Date().toISOString();

    // Save to file
    const registryPath = path.join(process.cwd(), 'server', 'tools-registry.json');
    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2));

    return NextResponse.json({ success: true, registry });
  } catch (error) {
    console.error('Error saving registry:', error);
    return NextResponse.json({ error: 'Failed to save registry' }, { status: 500 });
  }
} 