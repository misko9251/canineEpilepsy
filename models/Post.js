const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);