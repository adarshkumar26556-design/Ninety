const Admin = require('../models/Admin');
const Property = require('../models/Property');

module.exports = async function seed() {
  try {
    // Create default admin if not exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@vilstay.com' });
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@vilstay.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
      console.log('✅ Default admin created: admin@vilstay.com / admin123');
    }

    // Seed properties if none exist
    const count = await Property.countDocuments();
    if (count === 0) {
      const properties = [
        {
          name: 'Manikarnika Boutique Resort',
          slug: 'manikarnika-boutique-resort',
          brand: 'Vilstay',
          propertyType: 'Resort',
          location: { destination: 'Manjeri', city: 'Manjeri', state: 'Kerala', country: 'India' },
          shortDescription: 'Laterite walls, a quiet courtyard, and the timeless warmth of a Kerala home.',
          description: 'Experience the charm of heritage wrapped in comfort at Manikarnika Boutique Resort.',
          images: ['https://d2gx18f76jq9dw.cloudfront.net/60840/01KKNTV0JSKSQNBFNCBQYB2ZWA.avif'],
          startingPrice: 3500,
          rating: 4.7,
          guests: 4,
          roomsCount: 8,
          amenities: ['Wi-Fi', 'Air Conditioning', 'Parking', 'Room Service', 'Family Friendly'],
          whatsappNumber: '+919947584947',
          featured: true,
          status: 'active',
          rooms: [
            { name: 'Heritage Deluxe Room', description: 'Traditional Kerala décor with modern comforts.', price: 3500, maxGuests: 2, bedType: 'King', images: [], amenities: ['AC', 'Wi-Fi'] },
          ],
        },
        {
          name: 'Panthalaza Lakefront Heritage Resort',
          slug: 'panthalaza-lakefront-heritage-resort',
          brand: 'Vilstay',
          propertyType: 'Resort',
          location: { destination: 'Narinada', city: 'Narinada', state: 'Kerala', country: 'India' },
          shortDescription: 'Slow mornings by the water. Heritage character, with room to simply be.',
          description: 'Nestled on the banks of a serene lake, this heritage resort offers stunning waterfront views.',
          images: ['https://d2gx18f76jq9dw.cloudfront.net/88563/01KTZVAB61NE9DAW779G2P2AVS.png'],
          startingPrice: 4200,
          rating: 4.8,
          guests: 6,
          roomsCount: 10,
          amenities: ['Wi-Fi', 'Parking', 'Room Service', 'Lake View', 'Air Conditioning'],
          whatsappNumber: '+919947584947',
          featured: true,
          status: 'active',
          rooms: [],
        },
        {
          name: 'Kalani Boutique Stay Vythiri',
          slug: 'kalani-boutique-stay-vythiri',
          brand: 'Vilstay',
          propertyType: 'Boutique Stay',
          location: { destination: 'Vythiri', city: 'Vythiri', state: 'Kerala', country: 'India' },
          shortDescription: 'Wake to green hills and spend a little longer in the stillness of Wayanad.',
          description: 'A hidden gem nestled in the lush forests of Vythiri, Wayanad.',
          images: ['https://d2gx18f76jq9dw.cloudfront.net/102717/01KXZN3YAFCHCF7YG7SQVTW7ZD.jpeg'],
          startingPrice: 3200,
          rating: 4.6,
          guests: 4,
          roomsCount: 6,
          amenities: ['Wi-Fi', 'Room Service', 'Family Friendly', 'Mountain View'],
          whatsappNumber: '+919947584947',
          featured: true,
          status: 'active',
          rooms: [],
        },
        {
          name: 'Malabar Comforts Alappuzha',
          slug: 'malabar-comforts-alappuzha',
          brand: 'Vilstay Go',
          propertyType: 'Hotel',
          location: { destination: 'Alappuzha', city: 'Alappuzha', state: 'Kerala', country: 'India' },
          shortDescription: 'An easy, comfortable base for discovering the everyday charm of Alappuzha.',
          description: 'The ideal city hotel for travellers exploring the backwaters of Alappuzha.',
          images: ['https://d2gx18f76jq9dw.cloudfront.net/102713/01KXZMMSMVQRJQGSVYZTC55WDT.png'],
          startingPrice: 2200,
          rating: 4.3,
          guests: 3,
          roomsCount: 20,
          amenities: ['Wi-Fi', 'Parking', 'Air Conditioning', 'Family Friendly'],
          whatsappNumber: '+919656584947',
          featured: false,
          status: 'active',
          rooms: [],
        },
        {
          name: 'Hill View Residency',
          slug: 'hill-view-residency',
          brand: 'Vilstay Go',
          propertyType: 'Hotel',
          location: { destination: 'Kottakkal', city: 'Kottakkal', state: 'Kerala', country: 'India' },
          shortDescription: 'A welcoming place to pause, recharge, and make yourself at home.',
          description: 'Hill View Residency offers comfortable stays in the heart of Kottakkal.',
          images: ['https://d2gx18f76jq9dw.cloudfront.net/116147/01M13CMRANN15QF8FM8JZNPDXG.png'],
          startingPrice: 1800,
          rating: 4.2,
          guests: 4,
          roomsCount: 15,
          amenities: ['Wi-Fi', 'Parking', 'Air Conditioning', 'Family Friendly'],
          whatsappNumber: '+919947584947',
          featured: false,
          status: 'active',
          rooms: [],
        },
        {
          name: 'Edakkal Village Resort',
          slug: 'edakkal-village-resort',
          brand: 'Vilstay',
          propertyType: 'Resort',
          location: { destination: 'Wayanad', city: 'Sultan Bathery', state: 'Kerala', country: 'India' },
          shortDescription: 'A nature retreat near Edakkal Caves, surrounded by greenery and scenic views.',
          description: 'A tranquil nature escape near the famous Edakkal Caves in Wayanad.',
          images: ['https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80'],
          startingPrice: 2800,
          rating: 4.4,
          guests: 5,
          roomsCount: 12,
          amenities: ['Caretaker Support', 'Dining Area', 'Outdoor Seating', 'Parking'],
          whatsappNumber: '+919947584947',
          featured: true,
          status: 'active',
          rooms: [],
        },
      ];

      await Property.insertMany(properties);
      console.log(`✅ ${properties.length} properties seeded`);
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};
