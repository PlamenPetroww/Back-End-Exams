const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required!'],
        match: [/^[A-Za-z0-9]+@[A-Za-z]+.+[A-Za-z]/, 'Username must contain only english letters!'],
    },
    firstName: {
        type: String,
        minLength: [1, 'The first name must be at least 1 character'],
        required: true,
    },
    lastName: {
        type: String,
        minLength: [1, 'The last name must be at least 1 character'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
