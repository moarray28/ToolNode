const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import JWT
require('dotenv').config();  // Load environment variables
const cors = require('cors');

const User = require('./Users');

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
      location: '', // optional or null if you prefer
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

app.post('/tools', authenticateToken, async (req, res) => {
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
      location: user.location || null  // ✅ include null if undefined
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
        location: user.location || null
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(process.env.PORT || 5000, () => {    
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});