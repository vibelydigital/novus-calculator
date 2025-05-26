import mongoose from 'mongoose';

const priceItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['print', 'lamination', 'finishing', 'packing', 'installation']
  }
}, {
  timestamps: true
});

// Create a compound index to ensure unique names within each type
priceItemSchema.index({ name: 1, type: 1 }, { unique: true });

const PriceItem = mongoose.models.PriceItem || mongoose.model('PriceItem', priceItemSchema);

export default PriceItem; 