require('dotenv').config({ path: '.env.local' });
import clientPromise from './mongodb';
const bcrypt = require('bcryptjs');

async function initDb() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Create users collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === 'users');

    if (!collectionExists) {
      await db.createCollection('users');
      console.log('Created users collection');
    }

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Created email index');

    // Check if admin user exists
    const adminUser = await db.collection('users').findOne({ email: 'admin@novus.com' });

    if (!adminUser) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.collection('users').insertOne({
        email: 'admin@novus.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Created admin user');
    }

    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Run the initialization
initDb().catch(console.error); 