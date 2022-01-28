const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required:  [true, 'Must have a username'],
    },
    gender: {
        type: String,
        required: true,
    },
    bron: {
        type: Date,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    location: {
        type: [Number],
        required: false,
    },
    passion: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    social: {
        type: [String],
        required: false,
    },

})