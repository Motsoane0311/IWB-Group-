const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const queryRoutes = require('./routes/queryRoutes');
const incomeRoutes = require('./routes/incomeRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // Log requests to console
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/income', incomeRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected 🎉🎉');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});