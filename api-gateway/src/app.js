import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
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

// Simple test endpoints
app.get('/test/code', (req, res) => {
    res.json({
        status: 'Testing code service connection',
        target: process.env.CODE_SERVICE_URL
    });
});

app.get('/test/comment', (req, res) => {
    res.json({
        status: 'Testing comment service connection',
        target: process.env.COMMENT_SERVICE_URL
    });
});

// Direct API routes instead of proxy
// Code Snippets Routes
app.get('/api/snippets/', async (req, res) => {
    try {
        console.log('📤 GET /api/snippets/ - Forwarding to code service');
        const response = await axios.get(`${process.env.CODE_SERVICE_URL}/api/snippets/`);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Code Service Error:', error.message);
        res.status(500).json({
            error: 'Code service error',
            message: error.message
        });
    }
});

app.post('/api/snippets/create', async (req, res) => {
    try {
        console.log('📤 POST /api/snippets/create - Forwarding to code service');
        console.log('Request body:', req.body);

        const response = await axios.post(`${process.env.CODE_SERVICE_URL}/api/snippets/create`, req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('❌ Code Service Error:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: 'Code service error',
                message: error.message
            });
        }
    }
});

// Comments Routes
app.get('/api/comments/:id', async (req, res) => {
    try {
        console.log(`📤 GET /api/comments/${req.params.id} - Forwarding to comment service`);
        const response = await axios.get(`${process.env.COMMENT_SERVICE_URL}/api/comments/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Comment Service Error:', error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: 'Comment service error',
                message: error.message
            });
        }
    }
});

app.post('/api/comments/:id', async (req, res) => {
    try {
        console.log(`📤 POST /api/comments/${req.params.id} - Forwarding to comment service`);
        const response = await axios.post(`${process.env.COMMENT_SERVICE_URL}/api/comments/${req.params.id}`, req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('❌ Comment Service Error:', error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: 'Comment service error',
                message: error.message
            });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
    console.log(`📡 Comment Service URL: ${process.env.COMMENT_SERVICE_URL}`);
    console.log(`📡 Code Service URL: ${process.env.CODE_SERVICE_URL}`);
    console.log(`🌐 Allowed Origins: ${process.env.ALLOWED_ORIGINS}`);
});