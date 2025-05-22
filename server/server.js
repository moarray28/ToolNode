const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import JWT
require('dotenv').config();  // Load environment variables
const cors = require('cors');

const User = require('./User');
const Tool = require('./Tool');
const bcrypt = require('bcryptjs');
const frontend = process.env.VITE_FRONTEND_URL;

const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
  origin: frontend || '*',  // Allow requests from this origin
  methods: ["POST", "GET", "DELETE", "PUT"], // Allow these HTTP methods
  credentials: true
}));




const mongoURL = process.env.MONGO_URL;

//const userModel = require('./Schema');
// Connect to MongoDB Atlas
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB Atlas 😊👍');
  }) 
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Example route
 
app.get('/', (req, res) => {
  res.json({ message: 'Server is running perfectly!  😊👍' });
});

 app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (location optional, default null or '')
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      location: '',
      phoneNo: '',
      address: '' // optional or null if you prefer
    });

    await newUser.save();

    // Prepare payload & token
    const payload = { userId: newUser._id, username: newUser.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Return success response with token and user object (omit password)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        location: newUser.location,
      }
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Expected format: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.user = user; // Add decoded user info to request
    next(); // Proceed to the next middleware or route handler
  });
}
// POST rental request


app.get('/transactions', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Tools listed for rent by this user (they are the owner)
    const toolsGivenForRent = await Tool.find({ owner: userId });

    // Tools rented by this user (they appear in rentalRequests as renterId)
    const toolsRented = await Tool.find({ 'rentalRequests.renterId': userId });

    res.status(200).json({
      givenForRent: toolsGivenForRent,
      rented: toolsRented,
    });
  } catch (err) {
    console.error('Transaction history error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update user profile
app.put('/updateprofile', authenticateToken, async (req, res) => {
  const { location, phoneNo, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        location,
        phoneNo,
        address,
      },
      { new: true } // returns the updated document
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        location: updatedUser.location,
        phoneNo: updatedUser.phoneNo,
        address: updatedUser.address
      }
    });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/savetools', authenticateToken, async (req, res) => {
  const { title, category, image, durationInHours, ratePerHour } = req.body;

  try {
    const newTool = new Tool({
      title,
      category,
      image,
      durationInHours,
      ratePerHour,
      owner: req.user.userId,
    });

    await newTool.save();
    res.status(201).json({ message: 'Tool listed successfully', tool: newTool });
  } catch (err) {
    console.error('Tool creation error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


 app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token with optional location (null if not present)
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
      location: user.location || null,
      phoneNo: user.phoneNo || null,
      address: user.address || null
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send token and user info in response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
         location: user.location || null,
      phoneNo: user.phoneNo || null,
      address: user.address || null
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email phoneNo location');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



// GET /tools/:id
app.get('/tools/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id)
      .populate('owner', 'username email phoneNo location') // 👈 Use correct field names
      .exec();

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    res.json(tool);
  } catch (err) {
    console.error('Error fetching tool:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// POST /tools/:id/request
app.post('/tools/:id/request', authenticateToken, async (req, res) => {
  const { durationHours, startDate } = req.body;

  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    const newRequest = {
      renterId: req.user.userId,
      durationHours,
      startDate,
    };

    tool.rentalRequests.push(newRequest);
    await tool.save();

    res.status(200).json({ message: 'Rental request submitted' });
  } catch (err) {
    console.error('Error submitting rental request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET /tools with optional filters
app.get('/tools', async (req, res) => {
  try {
    const { category, location } = req.query;

    // Build dynamic filter object
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') }; // case-insensitive match
    }

    if (location) {
      filter['owner.location'] = { $regex: new RegExp(location, 'i') }; // will filter after populate
    }

    // First, fetch all tools and populate owner info
    let tools = await Tool.find()
      .populate('owner', 'username email phoneNo location') // Only pull relevant fields
      .exec();

    // Apply location filter manually after populate (since location is in owner)
    if (location) {
      tools = tools.filter(tool =>
        tool.owner?.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply category filter if not using Mongo regex directly
    if (category) {
      tools = tools.filter(tool =>
        tool.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    res.json(tools);
  } catch (err) {
    console.error('Error fetching tools:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.listen(process.env.PORT || 5000, () => {    
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});