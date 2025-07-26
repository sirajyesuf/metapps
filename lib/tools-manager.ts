import fs from 'fs/promises';
import path from 'path';

export interface Tool {
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

export interface ToolRegistry {
  lastUpdated: string;
  totalTools: number;
  activeTools: number;
  workingTools: number;
  tools: Tool[];
}

export async function readToolsRegistry(): Promise<ToolRegistry> {
  try {
    const registryPath = path.join(process.cwd(), 'server/tools-registry.json');
    const registryData = await fs.readFile(registryPath, 'utf-8');
    return JSON.parse(registryData);
  } catch (error) {
    console.error('Error reading tools registry:', error);
    return {
      lastUpdated: new Date().toISOString(),
      totalTools: 0,
      activeTools: 0,
      workingTools: 0,
      tools: []
    };
  }
}

export async function getToolById(toolId: string): Promise<Tool | null> {
  try {
    const registry = await readToolsRegistry();
    return registry.tools.find(tool => tool.id === toolId) || null;
  } catch (error) {
    console.error(`Error reading tool ${toolId}:`, error);
    return null;
  }
}

export async function isToolActive(toolId: string): Promise<boolean> {
  const tool = await getToolById(toolId);
  return tool ? tool.isActive && tool.isWorking : false;
}

export async function updateToolStatus(toolId: string, status: Partial<Tool>): Promise<boolean> {
  try {
    const registry = await readToolsRegistry();
    const toolIndex = registry.tools.findIndex(tool => tool.id === toolId);
    
    if (toolIndex === -1) {
      return false;
    }
    
    // Update tool status
    Object.assign(registry.tools[toolIndex], status);
    
    // Update registry metadata
    registry.lastUpdated = new Date().toISOString();
    registry.totalTools = registry.tools.length;
    registry.activeTools = registry.tools.filter(tool => tool.isActive).length;
    registry.workingTools = registry.tools.filter(tool => tool.isActive && tool.isWorking).length;
    
    // Write back to file
    const registryPath = path.join(process.cwd(), 'server/tools-registry.json');
    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2));
    
    return true;
  } catch (error) {
    console.error(`Error updating tool status for ${toolId}:`, error);
    return false;
  }
}

export async function addNewTool(tool: Omit<Tool, 'lastTested'>): Promise<boolean> {
  try {
    const registry = await readToolsRegistry();
    
    // Check if tool already exists
    if (registry.tools.find(t => t.id === tool.id)) {
      return false;
    }
    
    // Add new tool
    const newTool: Tool = {
      ...tool
    };
    
    registry.tools.push(newTool);
    
    // Update registry metadata
    registry.lastUpdated = new Date().toISOString();
    registry.totalTools = registry.tools.length;
    registry.activeTools = registry.tools.filter(tool => tool.isActive).length;
    registry.workingTools = registry.tools.filter(tool => tool.isActive && tool.isWorking).length;
    
    // Write back to file
    const registryPath = path.join(process.cwd(), 'server/tools-registry.json');
    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error adding new tool:', error);
    return false;
  }
}

export async function removeTool(toolId: string): Promise<boolean> {
  try {
    const registry = await readToolsRegistry();
    const toolIndex = registry.tools.findIndex(tool => tool.id === toolId);
    
    if (toolIndex === -1) {
      return false;
    }
    
    // Remove tool
    registry.tools.splice(toolIndex, 1);
    
    // Update registry metadata
    registry.lastUpdated = new Date().toISOString();
    registry.totalTools = registry.tools.length;
    registry.activeTools = registry.tools.filter(tool => tool.isActive).length;
    registry.workingTools = registry.tools.filter(tool => tool.isActive && tool.isWorking).length;
    
    // Write back to file
    const registryPath = path.join(process.cwd(), 'server/tools-registry.json');
    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2));
    
    return true;
  } catch (error) {
    console.error(`Error removing tool ${toolId}:`, error);
    return false;
  }
} 