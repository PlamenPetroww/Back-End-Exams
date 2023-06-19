const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: [true, 'Username is required!'],
    },
    password: {
        type: String,
        minLength: 5,
        required: [true, 'Password is required!'],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
