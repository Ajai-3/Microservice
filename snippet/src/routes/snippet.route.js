import express from 'express';
const router = express.Router();
import { createSnipet } from '../controllers/snippet.controller.js';


router.post('/create', createSnipet);

export default router;

