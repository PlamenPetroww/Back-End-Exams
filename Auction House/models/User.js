const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required!'],
        match: [/^[A-Za-z]+$/, 'Username must contain only english letters!'],
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
