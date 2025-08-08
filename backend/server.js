const connectDB = require('./db/connection');

// Connect to MongoDB with proper error handling
const initializeServer = async () => {
  try {
    console.log('🚀 Starting server initialization...');
    await connectDB();
    console.log('✅ Database connected successfully!');
    
    const express = require('express');
    const Listing = require('./db/models/Listing');
    const bcrypt = require('bcrypt');
    const cookieParser = require('cookie-parser');
    const User = require('./db/models/User');
    const Booking = require('./db/models/Booking');

    const server = express();

    // CORS middleware
    server.use((req, res, next) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://localhost:3000',
        // Netlify domains
        'https://*.netlify.app',
        'https://radiant-beijinho-f00df5.netlify.app',
        'https://ziao-capstone.netlify.app',
        'https://zaio-capstone.netlify.app'
      ];
      
      const origin = req.headers.origin;
      if (origin && allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin.includes('*')) {
          return origin.includes(allowedOrigin.replace('*', ''));
        }
        return allowedOrigin === origin;
      })) {
        res.header('Access-Control-Allow-Origin', origin);
      }
      
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    // Increase JSON body parser limit to handle large payloads (like base64 images)
    server.use(express.json({ limit: '50mb' }));
    server.use(express.urlencoded({ limit: '50mb', extended: true }));
    server.use(cookieParser());

    // Authentication middleware
    const authenticateHost = async (req, res, next) => {
      try {
        console.log('Authenticating host request...');
        console.log('Cookies:', req.cookies);
        console.log('Headers:', req.headers);
        
        const userId = req.cookies.userId;
        if (!userId) {
          console.log('No userId cookie found');
          return res.status(401).json({ error: 'Not authenticated' });
        }
        
        console.log('Found userId:', userId);
        const user = await User.findById(userId);
        if (!user) {
          console.log('User not found in database');
          return res.status(401).json({ error: 'User not found' });
        }
        
        console.log('User found:', { email: user.email, role: user.role });
        if (user.role !== 'host') {
          console.log('User is not a host');
          return res.status(403).json({ error: 'Host access required' });
        }
        
        req.user = user;
        console.log('Authentication successful for host:', user.email);
        next();
      } catch (err) {
        console.error('Authentication error:', err);
        res.status(500).json({ error: 'Authentication failed' });
      }
    };

    // --- MongoDB-powered listing endpoints ---
    server.get('/api/listings', async (req, res) => {
      try {
        // Quick health check response for Railway
        const userAgent = req.headers['user-agent'] || '';
        if (userAgent.includes('Railway') || req.query.health === 'true') {
          return res.status(200).json({ status: 'OK', message: 'Server is healthy' });
        }
        
        const { city, country, page = 1, limit = 20 } = req.query;
        let filter = {};
        if (city) filter['address.city'] = city;
        if (country) filter['address.country'] = country;
        
        // Use pagination to limit results
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const listings = await Listing.find(filter)
          .limit(parseInt(limit))
          .skip(skip)
          .select('-__v') // Exclude version field to reduce payload
          .lean(); // Use lean queries for better performance
        
        // Get total count for pagination
        const total = await Listing.countDocuments(filter);
        
        res.json({
          listings,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalItems: total,
            hasNextPage: skip + listings.length < total,
            hasPrevPage: parseInt(page) > 1
          }
        });
      } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).json({ error: 'Failed to fetch listings' });
      }
    });

    server.get('/api/cities', async (req, res) => {
      try {
        const listings = await Listing.find({}, { 'address.city': 1, 'address.country': 1, _id: 0 });
        const citySet = new Set();
        listings.forEach(l => {
          if (l.address && l.address.city && l.address.country) {
            citySet.add(`${l.address.city},${l.address.country}`);
          }
        });
        const cities = Array.from(citySet).map(str => {
          const [city, country] = str.split(',');
          return { city, country };
        });
        res.json(cities);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cities' });
      }
    });

    // Host Listings endpoints (must be before /:id route)
    server.get('/api/listings/host', authenticateHost, async (req, res) => {
      try {
        console.log('Fetching listings for host:', req.user._id);
        const listings = await Listing.find({ hostId: req.user._id });
        console.log('Found listings:', listings.length);
        res.json(listings);
      } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).json({ error: 'Failed to fetch listings' });
      }
    });

    server.get('/api/listings/:id', async (req, res) => {
      try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        res.json(listing);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listing' });
      }
    });

    // Host Reservations endpoints
    server.get('/api/reservations/host', authenticateHost, async (req, res) => {
      try {
        const bookings = await Booking.find({ hostId: req.user._id })
          .populate('userId', 'firstName lastName')
          .populate('listingId', 'title');
        
        const reservations = bookings.map(booking => ({
          _id: booking._id,
          guestName: `${booking.userId?.firstName || ''} ${booking.userId?.lastName || ''}`.trim(),
          propertyName: booking.listingId?.title || 'N/A',
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          numberOfGuests: booking.numberOfGuests,
          totalPrice: booking.totalPrice,
          status: booking.status
        }));
        
        res.json(reservations);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
      }
    });

    server.delete('/api/reservations/:id', authenticateHost, async (req, res) => {
      try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Reservation not found' });
        
        // Ensure the host owns this reservation
        if (booking.hostId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Not authorized' });
        }
        
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reservation deleted' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete reservation' });
      }
    });

    // Host Listings endpoints (must be before /:id route)
    server.get('/api/listings/host', authenticateHost, async (req, res) => {
      try {
        const listings = await Listing.find({ hostId: req.user._id });
        res.json(listings);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listings' });
      }
    });

    server.post('/api/listings', authenticateHost, async (req, res) => {
      try {
        
        const {
          title, address, description, enhancedCleaning, selfCheckIn,
          amenities, pricing, propertyDetails, images
        } = req.body;

        const listing = new Listing({
          title,
          description,
          hostId: req.user._id,
          hostEmail: req.user.email,
          address: {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country
          },
          propertyDetails: {
            bedNum: propertyDetails.bedNum,
            bathNum: propertyDetails.bathNum,
            maxGuests: propertyDetails.maxGuests,
            propertyType: propertyDetails.propertyType,
            roomType: propertyDetails.roomType
          },
          amenities,
          images,
          pricing: {
            basePrice: pricing.basePrice,
            currency: pricing.currency,
            cleaningFee: pricing.cleaningFee,
            serviceFee: pricing.serviceFee,
            securityDeposit: pricing.securityDeposit,
            extraGuestFee: pricing.extraGuestFee
          },
          availability: {
            isAvailable: true,
            minimumStay: 1,
            maximumStay: 30
          },
          ratings: {
            averageRating: 0,
            totalReviews: 0
          },
          dateCreated: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        });

        console.log('Saving listing:', listing);
        await listing.save();
        console.log('Listing saved successfully with ID:', listing._id);
        res.status(201).json({ message: 'Listing created', listing });
      } catch (err) {
        console.error('Error creating listing:', err);
        res.status(500).json({ error: 'Failed to create listing: ' + err.message });
      }
    });

    server.delete('/api/listings/:id', authenticateHost, async (req, res) => {
      try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        
        // Ensure the host owns this listing
        if (listing.hostId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Not authorized' });
        }
        
        await Listing.findByIdAndDelete(req.params.id);
        res.json({ message: 'Listing deleted' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete listing' });
      }
    });

    // Authentication middleware for guests
    const authenticateGuest = async (req, res, next) => {
      try {
        const userId = req.cookies.userId;
        if (!userId) {
          return res.status(401).json({ error: 'Not authenticated' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        
        if (user.role !== 'guest') {
          return res.status(403).json({ error: 'Guest access required' });
        }
        
        req.user = user;
        next();
      } catch (err) {
        res.status(500).json({ error: 'Authentication failed' });
      }
    };

    // Guest Reservations endpoints
    server.get('/api/reservations/guest', authenticateGuest, async (req, res) => {
      try {
        const bookings = await Booking.find({ userId: req.user._id })
          .populate('listingId', 'title');
        
        const reservations = bookings.map(booking => ({
          _id: booking._id,
          propertyName: booking.listingId?.title || 'N/A',
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          numberOfGuests: booking.numberOfGuests,
          totalPrice: booking.totalPrice,
          status: booking.status
        }));
        
        res.json(reservations);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
      }
    });

    server.put('/api/reservations/:id/cancel', authenticateGuest, async (req, res) => {
      try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Reservation not found' });
        
        // Ensure the guest owns this reservation
        if (booking.userId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Not authorized' });
        }
        
        booking.status = 'cancelled';
        await booking.save();
        res.json({ message: 'Reservation cancelled' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to cancel reservation' });
      }
    });

    server.put('/api/reservations/:id/modify', authenticateGuest, async (req, res) => {
      try {
        const { checkIn, checkOut, numberOfGuests } = req.body;
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) return res.status(404).json({ error: 'Reservation not found' });
        
        // Ensure the guest owns this reservation
        if (booking.userId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Not authorized' });
        }
        
        // Update the booking
        booking.checkIn = checkIn;
        booking.checkOut = checkOut;
        booking.numberOfGuests = numberOfGuests;
        
        // Recalculate total price based on new dates and guests
        const listing = await Listing.findById(booking.listingId);
        if (listing) {
          const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
          const basePrice = listing.pricing.basePrice * nights;
          const extraGuestFee = numberOfGuests > 1 ? (numberOfGuests - 1) * (listing.pricing.extraGuestFee || 0) : 0;
          booking.totalPrice = basePrice + extraGuestFee + (listing.pricing.cleaningFee || 0);
        }
        
        await booking.save();
        res.json({ message: 'Reservation modified', booking });
      } catch (err) {
        res.status(500).json({ error: 'Failed to modify reservation' });
      }
    });

    // Booking endpoint
    server.post('/api/bookings', authenticateGuest, async (req, res) => {
      try {
        
        const { listingId, checkIn, checkOut, numberOfGuests, totalPrice } = req.body;

        // Validate required fields
        if (!listingId || !checkIn || !checkOut || !numberOfGuests) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate dates
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate <= today) {
          return res.status(400).json({ error: 'Check-in date must be in the future' });
        }

        if (checkOutDate <= checkInDate) {
          return res.status(400).json({ error: 'Check-out date must be after check-in date' });
        }

        // Get listing details
        const listing = await Listing.findById(listingId);
        if (!listing) {
          return res.status(404).json({ error: 'Listing not found' });
        }

        // Check guest limit
        if (numberOfGuests > listing.propertyDetails.maxGuests) {
          return res.status(400).json({ error: `Maximum ${listing.propertyDetails.maxGuests} guests allowed` });
        }

        // Check availability (basic check - can be enhanced)
        const existingBookings = await Booking.find({
          listingId,
          status: { $in: ['confirmed', 'pending'] },
          $or: [
            {
              checkIn: { $lt: checkOutDate },
              checkOut: { $gt: checkInDate }
            }
          ]
        });

        if (existingBookings.length > 0) {
          return res.status(400).json({ error: 'Property is not available for the selected dates' });
        }

        // Create booking
        const bookingData = {
          userId: req.user._id,
          listingId,
          destination: `${listing.address.city}, ${listing.address.country}`,
          checkIn,
          checkOut,
          numberOfGuests,
          totalPrice,
                  currency: 'ZAR',
          status: 'pending',
          bookingDate: new Date().toISOString(),
          paymentStatus: 'pending',
          guestDetails: {
            adults: numberOfGuests,
            children: 0,
            infants: 0
          },
          contactInfo: {
            phone: req.user.phoneNumber || '',
            email: req.user.email
          }
        };

        // Only add hostId if it exists in the listing
        if (listing.hostId) {
          bookingData.hostId = listing.hostId;
        }

        const booking = new Booking(bookingData);

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
      } catch (err) {
        console.error('Booking creation error:', err);
        console.error('Error details:', err.message);
        res.status(500).json({ error: 'Failed to create booking: ' + err.message });
      }
    });

    // Registration endpoint
    server.post('/api/auth/register', async (req, res) => {
      try {
        const { email, password, role, firstName, lastName, phoneNumber, dateOfBirth, profilePicture, languages, address } = req.body;
        if (!email || !password || !role) {
          return res.status(400).json({ error: 'Email, password, and role are required.' });
        }
        if (role === 'host') {
          if (!firstName || !lastName || !phoneNumber || !profilePicture || !languages || !address) {
            return res.status(400).json({ error: 'Missing required host fields.' });
          }
        }
        if (role === 'guest') {
          if (!firstName || !lastName) {
            return res.status(400).json({ error: 'Missing required guest fields.' });
          }
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: 'Email already registered.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          email,
          password: hashedPassword,
          role,
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth,
          profilePicture,
          languages,
          address,
          dateJoined: new Date().toISOString(),
          isVerified: false
        });
        await user.save();
        res.status(201).json({ message: 'Registration successful', user: { email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } });
      } catch (err) {
        res.status(500).json({ error: 'Registration failed.' });
      }
    });

    // Login endpoint
    server.post('/api/auth/login', async (req, res) => {
      try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
          return res.status(400).json({ error: 'Email, password, and role are required.' });
        }
        const user = await User.findOne({ email, role });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
        // Set cookie for session (simple userId cookie for now)
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          sameSite: isProduction ? 'none' : 'lax',
          secure: isProduction,
          path: '/'
        };
        
        res.cookie('userId', user._id.toString(), cookieOptions);
        res.cookie('role', user.role, cookieOptions);
        res.json({ message: 'Login successful', user: { email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } });
      } catch (err) {
        res.status(500).json({ error: 'Login failed.' });
      }
    });

    // Session endpoint
    server.get('/api/auth/session', async (req, res) => {
      try {
        console.log('Session check - Cookies:', req.cookies);
        console.log('Session check - Headers:', req.headers);
        
        const userId = req.cookies.userId;
        if (!userId) {
          console.log('Session check - No userId cookie found');
          return res.status(401).json({ error: 'Not logged in' });
        }
        
        console.log('Session check - Found userId:', userId);
        const user = await User.findById(userId).select('-password');
        if (!user) {
          console.log('Session check - User not found in database');
          return res.status(401).json({ error: 'User not found' });
        }
        
        console.log('Session check - User found:', { email: user.email, role: user.role });
        res.json({ user });
      } catch (err) {
        console.error('Session check error:', err);
        res.status(500).json({ error: 'Session check failed' });
      }
    });

    // Logout endpoint
    server.post('/api/auth/logout', (req, res) => {
      const isProduction = process.env.NODE_ENV === 'production';
      const cookieOptions = {
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction,
        path: '/'
      };
      
      res.clearCookie('userId', cookieOptions);
      res.clearCookie('role', cookieOptions);
      res.json({ message: 'Logged out' });
    });

    const PORT = process.env.PORT || 5002;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check available at: http://localhost:${PORT}/api/listings`);
    });

    // Simple health check endpoint
    server.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', message: 'Server is running' });
    });
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

initializeServer();