import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PriceItem from '@/models/PriceItem';

// GET all price items
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    console.log('Fetching items with type:', type);

    await connectDB();
    const query = type ? { type } : {};
    console.log('Query:', query);
    
    const items = await PriceItem.find(query).sort({ createdAt: -1 });
    console.log('Found items:', items);
    
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
    console.log('Starting POST request...');
    await connectDB();
    console.log('Database connected successfully');

    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, price, type } = body;
    console.log('Extracted fields:', { name, price, type });

    if (!name || !price || !type) {
      console.log('Missing required fields:', { name, price, type });
      return NextResponse.json(
        { error: 'Name, price, and type are required' },
        { status: 400 }
      );
    }

    // Check if item already exists
    const existingItem = await PriceItem.findOne({ name, type });
    if (existingItem) {
      console.log('Item already exists:', existingItem);
      return NextResponse.json(
        { error: 'Item with this name already exists for this type' },
        { status: 400 }
      );
    }

    try {
      const item = await PriceItem.create({
        name,
        price: Number(price),
        type
      });
      console.log('Created new item:', item);
      return NextResponse.json(item, { status: 201 });
    } catch (createError: unknown) {
      console.error('Error during item creation:', createError);
      if (createError instanceof Error) {
        console.error('Error name:', createError.name);
        console.error('Error message:', createError.message);
        console.error('Error stack:', createError.stack);
      }
      return NextResponse.json(
        { error: `Failed to create price item: ${createError instanceof Error ? createError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: `Failed to create price item: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 