import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 500
    },
    snippetId: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 500
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

