import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import commentRoutes from './routes/comment.route.js';
import connectDB from './db/db.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Comment Service',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
