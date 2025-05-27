import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

// Get admin credentials directly from process.env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Debug log to check environment variables
console.log('Environment variables loaded:', {
  ADMIN_USERNAME: ADMIN_USERNAME || 'not set',
  ADMIN_PASSWORD: ADMIN_PASSWORD ? '****' : 'not set',
  NODE_ENV: process.env.NODE_ENV
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt:', {
      providedUsername: username,
      providedPassword: password ? '****' : 'not set',
      isAdminAttempt: username === ADMIN_USERNAME
    });

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if it's an admin login
    if (username === ADMIN_USERNAME) {
      console.log('Admin login attempt detected');
      
      if (!ADMIN_PASSWORD) {
        console.error('Admin password not set in environment variables');
        return NextResponse.json(
          { error: 'Admin authentication not properly configured' },
          { status: 500 }
        );
      }

      if (password === ADMIN_PASSWORD) {
        console.log('Admin login successful');
        // Create JWT token for admin
        const token = jwt.sign(
          { 
            username: ADMIN_USERNAME,
            role: 'admin'
          },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '1d' }
        );

        // Create response with admin data
        const response = NextResponse.json({
          user: {
            username: ADMIN_USERNAME,
            role: 'admin'
          }
        });

        // Set cookie in response
        response.cookies.set('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
      }
      
      console.log('Admin login failed: Invalid password');
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Handle regular user login
    await connectDB();
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Compare passwords directly since we're storing them in plain text
    if (password !== user.password) {
      console.log('Invalid password for user:', username);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    console.log('User login successful:', username);

    // Create JWT token for regular user
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Create response with user data
    const response = NextResponse.json({
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      }
    });

    // Set cookie in response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
} 