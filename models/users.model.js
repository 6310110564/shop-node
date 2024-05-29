const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema)
