import express from 'express';
const router = express.Router();
import { createComment, getCommentBySnippetId } from '../controllers/comment.controller.js';


router.post('/:id/comment', createComment);
router.get('/:id/comment', getCommentBySnippetId);

export default router;

