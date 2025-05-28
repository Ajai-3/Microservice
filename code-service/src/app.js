import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import snippetsRoutes from './routes/snippets.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/snippets', snippetsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
