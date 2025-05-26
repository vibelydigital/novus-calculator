import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

// Mock admin user data
const adminUser = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  role: 'admin'
};

export async function GET(request: Request) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // If it's an admin user
    if (decoded.role === 'admin') {
      return NextResponse.json({
        user: {
          username: decoded.username,
          role: 'admin'
        }
      });
    }

    // Handle regular user check
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { error: 'Failed to check authentication' },
      { status: 500 }
    );
  }
} 