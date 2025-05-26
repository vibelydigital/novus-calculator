import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/models/Material';

// GET all materials
export async function GET() {
  try {
    await connectDB();
    const materials = await Material.find().sort({ createdAt: -1 });
    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}

// POST new material
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const material = await Material.create(body);
    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error('Error creating material:', error);
    return NextResponse.json(
      { error: 'Failed to create material' },
      { status: 500 }
    );
  }
} 