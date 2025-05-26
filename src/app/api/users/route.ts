import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET all users
export async function GET() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Fetching users...');
    const users = await User.find().sort({ createdAt: -1 });
    console.log(`Found ${users.length} users`);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request: Request) {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    const body = await request.json();
    const { username, password } = body;
    
    console.log('Received user creation request:', { 
      username,
      password
    });
    
    if (!username || !password) {
      console.log('Missing required fields:', { 
        username: !!username, 
        password: !!password 
      });
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists:', username);
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      username,
      password,
      role: 'user'
    });

    console.log('User created successfully:', { 
      userId: user._id, 
      username: user.username,
      role: user.role
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Detailed error creating user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create user' },
      { status: 500 }
    );
  }
} 