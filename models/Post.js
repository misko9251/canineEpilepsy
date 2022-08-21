const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', PostSchema);