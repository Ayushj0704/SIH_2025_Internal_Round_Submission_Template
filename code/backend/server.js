import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Init Middleware
app.use(express.json()); // Allows us to get data in req.body

// Define Routes
app.use('/api/auth', authRoutes);

// Simple route for server health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
