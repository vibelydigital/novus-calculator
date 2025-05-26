import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check if it's an admin login using environment variables
    if (email === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Create the response
      const response = NextResponse.json({
        id: '1',
        email: process.env.ADMIN_USERNAME,
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