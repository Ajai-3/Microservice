import express from 'express';
const router = express.Router();
import { createSnippet, getAllSnippets } from '../controllers/snippet.controller.js';

// Routes for code snippets
router.post('/create', createSnippet);  // POST /api/snippets/create - Create new snippet
router.get('/', getAllSnippets);  // GET /api/snippets - Get all snippets

export default router;

