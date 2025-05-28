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

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'API Gateway',
        timestamp: new Date().toISOString()
    });
});

// Service routes
app.use('/api/comments', createProxyMiddleware({
    target: process.env.COMMENT_SERVICE_URL,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    onError: (err, req, res) => {
        console.error('❌ Comment Service Proxy Error:', err.message);
        console.error('Target:', process.env.COMMENT_SERVICE_URL);
        res.status(503).json({
            error: 'Comment service unavailable',
            message: err.message
        });
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('📤 Proxying to Comment Service:', req.url);
    }
}));

app.use('/api/snippets', createProxyMiddleware({
    target: process.env.CODE_SERVICE_URL,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    onError: (err, req, res) => {
        console.error('❌ Code Service Proxy Error:', err.message);
        console.error('Target:', process.env.CODE_SERVICE_URL);
        res.status(503).json({
            error: 'Code service unavailable',
            message: err.message
        });
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('📤 Proxying to Code Service:', req.url);
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
    console.log(`📡 Comment Service URL: ${process.env.COMMENT_SERVICE_URL}`);
    console.log(`📡 Code Service URL: ${process.env.CODE_SERVICE_URL}`);
    console.log(`🌐 Allowed Origins: ${process.env.ALLOWED_ORIGINS}`);
});