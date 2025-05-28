import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

    // Service routes
    app.use('/api/comments', createProxyMiddleware({
        target: process.env.COMMENT_SERVICE_URL,
        changeOrigin: true
    }));

    app.use('/api/code', createProxyMiddleware({
        target: process.env.CODE_SERVICE_URL,
        changeOrigin: true
    }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});