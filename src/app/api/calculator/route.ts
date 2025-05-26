import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PriceItem from '@/models/PriceItem';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all price items grouped by type
    const items = await PriceItem.find().sort({ createdAt: -1 });
    
    // Group items by type
    const groupedItems = items.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push({
        id: item._id,
        name: item.name,
        price: item.price
      });
      return acc;
    }, {} as Record<string, Array<{ id: string; name: string; price: number }>>);

    return NextResponse.json(groupedItems);
  } catch (error) {
    console.error('Error fetching calculator data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calculator data' },
      { status: 500 }
    );
  }
} 