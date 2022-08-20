const mongoose = require('mongoose');

const seizureSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: { 
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    observation: {
        type: String
    },
    person: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Seizure', seizureSchema)