const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required!'],
    },
    password: {
        type: String,
        required: true,
    },
    shares: [{
        type: mongoose.Types.ObjectId,
        ref: 'book',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
