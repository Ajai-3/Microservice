import mongoose from 'mongoose';
// Snippet model
const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    code: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 5000
    }
}, { timestamps: true });

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;

