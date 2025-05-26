import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PriceItem from '@/models/PriceItem';

// GET all price items
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    await connectDB();
    const query = type ? { type } : {};
    const items = await PriceItem.find(query).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching price items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price items' },
      { status: 500 }
    );
  }
}

// POST new price item
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, price, type } = body;

    if (!name || !price || !type) {
      return NextResponse.json(
        { error: 'Name, price, and type are required' },
        { status: 400 }
      );
    }

    // Check if item already exists
    const existingItem = await PriceItem.findOne({ name, type });
    if (existingItem) {
      return NextResponse.json(
        { error: 'Item with this name already exists for this type' },
        { status: 400 }
      );
    }

    const item = await PriceItem.create({
      name,
      price: Number(price),
      type
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating price item:', error);
    return NextResponse.json(
      { error: 'Failed to create price item' },
      { status: 500 }
    );
  }
} 