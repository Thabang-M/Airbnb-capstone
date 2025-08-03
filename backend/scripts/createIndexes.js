const mongoose = require('mongoose');
const connectDB = require('../db/connection');

/**
 * 🗄️ Database Indexes Creation Script
 * Creates indexes for better query performance
 */

async function createIndexes() {
  try {
    await connectDB();
    console.log('🗄️ Creating database indexes...\n');

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Create indexes for each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`📝 Creating indexes for ${collectionName}...`);
      
      const collectionObj = mongoose.connection.db.collection(collectionName);
      
      // Create indexes based on collection type
      switch (collectionName) {
        case 'listings':
          await collectionObj.createIndex({ city: 1 });
          await collectionObj.createIndex({ country: 1 });
          await collectionObj.createIndex({ hostId: 1 });
          await collectionObj.createIndex({ price: 1 });
          await collectionObj.createIndex({ createdAt: -1 });
          await collectionObj.createIndex({ 
            title: 'text', 
            description: 'text',
            address: 'text'
          });
          console.log('✅ Created indexes for listings collection');
          break;
          
        case 'users':
          await collectionObj.createIndex({ email: 1 }, { unique: true });
          await collectionObj.createIndex({ role: 1 });
          await collectionObj.createIndex({ createdAt: -1 });
          console.log('✅ Created indexes for users collection');
          break;
          
        case 'hosts':
          await collectionObj.createIndex({ email: 1 }, { unique: true });
          await collectionObj.createIndex({ userId: 1 });
          await collectionObj.createIndex({ createdAt: -1 });
          console.log('✅ Created indexes for hosts collection');
          break;
          
        case 'bookings':
          await collectionObj.createIndex({ guestId: 1 });
          await collectionObj.createIndex({ listingId: 1 });
          await collectionObj.createIndex({ hostId: 1 });
          await collectionObj.createIndex({ checkIn: 1 });
          await collectionObj.createIndex({ checkOut: 1 });
          await collectionObj.createIndex({ status: 1 });
          await collectionObj.createIndex({ createdAt: -1 });
          console.log('✅ Created indexes for bookings collection');
          break;
          
        case 'reservations':
          await collectionObj.createIndex({ guestId: 1 });
          await collectionObj.createIndex({ listingId: 1 });
          await collectionObj.createIndex({ hostId: 1 });
          await collectionObj.createIndex({ checkIn: 1 });
          await collectionObj.createIndex({ checkOut: 1 });
          await collectionObj.createIndex({ status: 1 });
          await collectionObj.createIndex({ createdAt: -1 });
          console.log('✅ Created indexes for reservations collection');
          break;
          
        default:
          console.log(`⚠️  No specific indexes defined for ${collectionName}`);
      }
    }
    
    console.log('\n🎉 All database indexes created successfully!');
    console.log('📊 Index Summary:');
    console.log('- listings: city, country, hostId, price, createdAt, text search');
    console.log('- users: email (unique), role, createdAt');
    console.log('- hosts: email (unique), userId, createdAt');
    console.log('- bookings: guestId, listingId, hostId, checkIn, checkOut, status, createdAt');
    console.log('- reservations: guestId, listingId, hostId, checkIn, checkOut, status, createdAt');
    
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the script
createIndexes(); 