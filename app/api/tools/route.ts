import { NextRequest, NextResponse } from 'next/server';
import { readToolsRegistry, updateToolStatus } from '@/lib/tools-manager';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const registry = await readToolsRegistry();
    
    if (status === 'active') {
      // Only return active and working tools
      const activeTools = registry.tools.filter(tool => 
        tool.isActive && tool.isWorking
      );
      return NextResponse.json({ 
        tools: activeTools,
        total: activeTools.length,
        lastUpdated: registry.lastUpdated
      });
    }
    
    return NextResponse.json(registry);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { toolId, isActive, isWorking } = await request.json();
    
    if (!toolId) {
      return NextResponse.json(
        { error: 'Tool ID is required' },
        { status: 400 }
      );
    }
    
    const success = await updateToolStatus(toolId, { isActive, isWorking });
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Tool not found or update failed' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating tool status:', error);
    return NextResponse.json(
      { error: 'Failed to update tool status' },
      { status: 500 }
    );
  }
} 