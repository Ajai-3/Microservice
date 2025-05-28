import express from 'express';
const router = express.Router();
import { createComment, getCommentBySnippetId } from '../controllers/comment.controller.js';


// Routes for comments on snippets
router.post('/:id', createComment);  // POST /api/comments/:id - Create comment for snippet
router.get('/:id', getCommentBySnippetId);  // GET /api/comments/:id - Get comments for snippet

export default router;

