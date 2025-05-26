import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user data - replace with actual database in production
const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', email: 'user@example.com', password: 'user123', role: 'user' }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check if it's an admin login
    if (email === 'admin' && password === 'demopass') {
      // Create the response
      const response = NextResponse.json({
        id: '1',
        email: 'admin',
        role: 'admin'
      });

      // Set the auth token cookie
      response.cookies.set('auth-token', 'admin-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    // If credentials don't match admin, return error
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
} 