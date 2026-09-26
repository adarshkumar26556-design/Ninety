const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /api/properties
router.get('/properties', async (req, res) => {
  try {
    const { brand, destination, propertyType, featured, search, minPrice, maxPrice } = req.query;

    const query = { status: 'active' };

    if (brand) query.brand = brand;
    if (destination) query['location.destination'] = { $regex: destination, $options: 'i' };
    if (propertyType) query.propertyType = propertyType;
    if (featured === 'true') query.featured = true;
    if (minPrice || maxPrice) {
      query.startingPrice = {};
      if (minPrice) query.startingPrice.$gte = Number(minPrice);
      if (maxPrice) query.startingPrice.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'location.destination': { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const properties = await Property.find(query).sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/properties/:slug
router.get('/properties/:slug', async (req, res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug, status: 'active' });
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
