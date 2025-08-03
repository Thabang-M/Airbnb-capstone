const mongoose = require('mongoose');
const connectDB = require('../db/connection');
const Listing = require('../db/models/Listing');

// High-quality Unsplash images organized by property type and location
const imageCollections = {
  cabin: {
    mountain: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517320964270-a4e889817c2e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=80'
    ]
  },
  apartment: {
    city: [
      'https://images.unsplash.com/photo-1549921296-a01050bfc8c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ],
    downtown: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80'
    ]
  },
  home: {
    paris: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80'
    ],
    general: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    ],
    beach: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'
    ]
  },
  room: {
    tokyo: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80'
    ],
    general: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80'
    ]
  }
};

// Function to get appropriate images based on property type and location
function getImagesForListing(listing) {
  const propertyType = listing.propertyDetails?.propertyType?.toLowerCase();
  const city = listing.address?.city?.toLowerCase();
  const title = listing.title?.toLowerCase();
  
  // Determine the appropriate image collection
  let imageSet = [];
  
  if (propertyType === 'cabin') {
    imageSet = imageCollections.cabin.mountain;
  } else if (propertyType === 'apartment') {
    if (city === 'new york') {
      imageSet = imageCollections.apartment.city;
    } else {
      imageSet = imageCollections.apartment.downtown;
    }
  } else if (propertyType === 'home') {
    if (city === 'paris') {
      imageSet = imageCollections.home.paris;
    } else if (title.includes('beach') || city === 'polokwane') {
      imageSet = imageCollections.home.beach;
    } else {
      imageSet = imageCollections.home.general;
    }
  } else if (propertyType === 'room') {
    if (city === 'tokyo') {
      imageSet = imageCollections.room.tokyo;
    } else {
      imageSet = imageCollections.room.general;
    }
  } else {
    // Default to apartment images if property type is not recognized
    imageSet = imageCollections.apartment.city;
  }
  
  return imageSet;
}

// Function to check if an image is problematic
function isProblematicImage(imageUrl) {
  return imageUrl.includes('via.placeholder.com') || 
         imageUrl.startsWith('data:image/') ||
         imageUrl.length > 500; // Base64 images are usually very long
}

async function fixBrokenImages() {
  await connectDB();
  
  try {
    const listings = await Listing.find({});
    console.log(`Found ${listings.length} listings to check`);
    
    for (const listing of listings) {
      const currentImages = listing.images || [];
      let needsUpdate = false;
      let newImages = [];
      
      // Check if any images are problematic
      for (const image of currentImages) {
        if (isProblematicImage(image)) {
          needsUpdate = true;
          break;
        }
      }
      
      if (needsUpdate) {
        console.log(`\n🔧 Fixing images for: ${listing.title} (${listing.address?.city})`);
        console.log(`   Current images: ${currentImages.length}`);
        
        // Get appropriate images for this listing
        const replacementImages = getImagesForListing(listing);
        
        // Keep non-problematic images and replace problematic ones
        const goodImages = currentImages.filter(img => !isProblematicImage(img));
        const imagesToAdd = replacementImages.slice(0, 5 - goodImages.length);
        
        newImages = [...goodImages, ...imagesToAdd].slice(0, 5);
        
        // Update the listing
        await Listing.findByIdAndUpdate(listing._id, {
          images: newImages
        });
        
        console.log(`   ✅ Updated to ${newImages.length} images`);
        console.log(`   New images: ${newImages.map(img => img.substring(0, 50) + '...').join(', ')}`);
      } else {
        console.log(`✅ ${listing.title} - Images are good`);
      }
    }
    
    console.log('\n🎉 Successfully fixed all broken images!');
    
    // Show final results
    const updatedListings = await Listing.find({});
    console.log('\n📸 Final verification:');
    updatedListings.forEach((listing, index) => {
      const imageCount = listing.images ? listing.images.length : 0;
      const hasProblematicImages = listing.images?.some(img => isProblematicImage(img));
      console.log(`${index + 1}. ${listing.title}: ${imageCount} images ${hasProblematicImages ? '❌' : '✅'}`);
    });
    
  } catch (err) {
    console.error('Error fixing images:', err);
  } finally {
    mongoose.connection.close();
  }
}

fixBrokenImages(); 