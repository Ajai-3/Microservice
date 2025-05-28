import express from 'express';
const router = express.Router();
import { createSnipet, getAllSnippets } from '../controllers/snippet.controller.js';


router.post('/create', createSnipet);
router.get('/', getAllSnippets);

export default router;

