const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: [true, 'Username is required!'],
    }/* ,
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required!'],
    } */,
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        minLength: [20, 'The adress must be min 20 characters long!'],
        required: true,
    },
    myPublications: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
