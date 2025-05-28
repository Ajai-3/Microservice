import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import snippetsRoutes from './routes/snippet.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Code Service',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/snippets', snippetsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
