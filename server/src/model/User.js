const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);