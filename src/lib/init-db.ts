import * as dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function initDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  console.log('Connecting to MongoDB...');
  console.log('URI:', uri.replace(/\/\/[^:]+:[^@]+@/, '//<credentials>@')); // Log URI without credentials

  try {
    await mongoose.connect(uri, {
      ssl: true,
      tls: true,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000
    });
    console.log('Connected to MongoDB successfully');

    // Create a User model if it doesn't exist
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      username: String,
      password: String
    }));

    const exists = await User.findOne({ username: 'admin' });
    if (exists) {
      console.log('Admin user already exists.');
    } else {
      await User.create({ username: 'admin', password: 'demo1234' });
      console.log('✅ Admin user inserted.');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

initDb().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
