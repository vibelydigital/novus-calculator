import { NextResponse } from 'next/server';

// Mock user data - replace with actual database in production
const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', email: 'user@example.com', password: 'user123', role: 'user' }
];

export async function GET(request: Request) {
  try {
    // In a real application, you would:
    // 1. Get the session token from cookies
    // 2. Verify the token
    // 3. Get the user from the database
    // 4. Return the user data

    // For now, we'll just return the first user as a mock
    const user = MOCK_USERS[0];
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 