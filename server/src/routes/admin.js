const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token, user: { email: admin.email, role: admin.role } } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/dashboard
router.get('/dashboard', protect, async (req, res) => {
  try {
    const [total, vilstay, vilstayGo, vilstayVenue, recent] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ brand: 'Vilstay' }),
      Property.countDocuments({ brand: 'Vilstay Go' }),
      Property.countDocuments({ brand: 'Vilstay Venue' }),
      Property.find().sort({ createdAt: -1 }).limit(5),
    ]);
    res.json({ success: true, data: { total, byBrand: { vilstay, vilstayGo, vilstayVenue }, recent } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/properties
router.get('/properties', protect, async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/properties
router.post('/properties', protect, async (req, res) => {
  try {
    const body = req.body;

    // Parse arrays if sent as strings
    if (typeof body['amenities[]'] === 'string') body.amenities = [body['amenities[]']];
    else if (Array.isArray(body['amenities[]'])) body.amenities = body['amenities[]'];

    if (typeof body['images[]'] === 'string') body.images = [body['images[]']];
    else if (Array.isArray(body['images[]'])) body.images = body['images[]'];

    // Parse location
    if (body['location[destination]']) {
      body.location = {
        destination: body['location[destination]'],
        city: body['location[city]'] || body['location[destination]'],
        state: body['location[state]'] || 'Kerala',
        country: body['location[country]'] || 'India',
      };
    }

    // Parse rooms
    if (body.rooms && typeof body.rooms === 'string') {
      body.rooms = JSON.parse(body.rooms);
    }

    // Generate unique slug
    let slug = (body.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await Property.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;
    body.slug = slug;

    const property = new Property(body);
    await property.save();
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/properties/:id
router.put('/properties/:id', protect, async (req, res) => {
  try {
    const body = req.body;
    // Parse arrays
    if (typeof body['amenities[]'] === 'string') body.amenities = [body['amenities[]']];
    else if (Array.isArray(body['amenities[]'])) body.amenities = body['amenities[]'];
    if (typeof body['images[]'] === 'string') body.images = [body['images[]']];
    else if (Array.isArray(body['images[]'])) body.images = body['images[]'];
    // Parse location
    if (body['location[destination]']) {
      body.location = {
        destination: body['location[destination]'],
        city: body['location[city]'],
        state: body['location[state]'],
        country: body['location[country]'],
      };
    }

    const property = await Property.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/properties/:id
router.delete('/properties/:id', protect, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
