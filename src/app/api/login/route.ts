import { NextResponse } from 'next/server';

// Mock user data - replace with actual database in production
const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', email: 'user@example.com', password: 'user123', role: 'user' }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // In a real application, you would:
    // 1. Hash passwords
    // 2. Use proper session management
    // 3. Set secure HTTP-only cookies
    // 4. Implement proper error handling

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 