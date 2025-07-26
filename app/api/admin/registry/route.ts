import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function PUT(request: NextRequest) {
  try {
    const registry = await request.json();
    
    // Validate the registry structure
    if (!registry.tools || !Array.isArray(registry.tools)) {
      return NextResponse.json(
        { error: 'Invalid registry format' },
        { status: 400 }
      );
    }

    // Update metadata
    registry.lastUpdated = new Date().toISOString();
    registry.totalTools = registry.tools.length;
    registry.activeTools = registry.tools.filter((tool: any) => tool.isActive).length;
    registry.workingTools = registry.tools.filter((tool: any) => tool.isActive && tool.isWorking).length;

    // Write to file
    const registryPath = path.join(process.cwd(), 'server/tools-registry.json');
    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Registry updated successfully',
      lastUpdated: registry.lastUpdated
    });
  } catch (error) {
    console.error('Error updating registry:', error);
    return NextResponse.json(
      { error: 'Failed to update registry' },
      { status: 500 }
    );
  }
} 