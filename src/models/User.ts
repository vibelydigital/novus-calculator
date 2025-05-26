import mongoose from 'mongoose';

// Drop any existing indexes first
mongoose.connection.on('connected', async () => {
  if (mongoose.connection.db) {
    try {
      await mongoose.connection.db.collection('users').dropIndexes();
      console.log('Dropped all indexes from users collection');
    } catch (error) {
      console.log('No indexes to drop or error dropping indexes:', error);
    }
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Delete the old model if it exists to prevent the "Cannot overwrite model once compiled" error
if (mongoose.models.User) {
  delete mongoose.models.User;
}

// Create the model with explicit index on username
const User = mongoose.model('User', userSchema);

// Ensure username index is created
User.createIndexes().catch(console.error);

export default User; 