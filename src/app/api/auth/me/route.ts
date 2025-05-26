import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Mock admin user data
const adminUser = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  role: 'admin'
};

export async function GET(request: Request) {
  try {
    // Get the auth token from cookies
    const authToken = request.cookies.get('auth-token')?.value;

    // Check if it's an admin token
    if (authToken === 'admin-token') {
      return NextResponse.json(adminUser);
    }

    // Handle regular user check
    await connectDB();
    const user = await User.findById(authToken).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { error: 'Failed to check authentication' },
      { status: 500 }
    );
  }
} 