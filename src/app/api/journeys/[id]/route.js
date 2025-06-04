import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request,context) {
  const { id } = await context.params;
  const filePath = path.join(process.cwd(),'public' ,'journeys', `${id}.json`);
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const journey = JSON.parse(fileContents);
    return NextResponse.json(journey);
  } catch (error) {
    console.error('Error reading journey:', error);
    return NextResponse.json({ error: 'Journey not found' }, { status: 404 });
  }
}
