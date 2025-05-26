import { NextResponse } from 'next/server';

// Mock user data - replace with actual database in production
const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', email: 'user@example.com', password: 'user123', role: 'user' }
];

export async function GET(request: Request) {
  try {
    // In a real application, you would:
    // 1. Verify session token
    // 2. Fetch user data from database
    // 3. Check user permissions

    // For now, we'll just return a mock user
    // This will be replaced with actual session checking
    return NextResponse.json({
      id: '1',
      email: process.env.ADMIN_USERNAME,
      role: 'admin'
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 