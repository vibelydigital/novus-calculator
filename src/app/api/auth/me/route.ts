import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, you would get the user's session/token from the request
    // and verify it. For now, we'll just return a mock admin user
    return NextResponse.json({
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
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