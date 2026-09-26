const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  maxGuests: { type: Number, default: 2 },
  bedType: { type: String, default: 'King' },
  images: [String],
  amenities: [String],
});

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: {
    type: String,
    required: true,
    enum: ['Vilstay', 'Vilstay Go', 'Vilstay Venue'],
  },
  propertyType: {
    type: String,
    enum: ['Resort', 'Villa', 'Hotel', 'Boutique Stay', 'Homestay', 'Wedding Venue', 'Event Space'],
    default: 'Resort',
  },
  location: {
    destination: { type: String, required: true },
    city: String,
    state: { type: String, default: 'Kerala' },
    country: { type: String, default: 'India' },
  },
  shortDescription: String,
  description: String,
  images: [String],
  startingPrice: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  guests: { type: Number, default: 2 },
  roomsCount: { type: Number, default: 1 },
  amenities: [String],
  whatsappNumber: { type: String, default: '+919947584947' },
  googleMapsUrl: String,
  featured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['active', 'draft', 'inactive'],
    default: 'active',
  },
  rooms: [roomSchema],
}, {
  timestamps: true,
});

// Auto-generate slug before save
propertySchema.pre('save', function(next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Property', propertySchema);
