const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: [3, 'Firstname must be at least 3 charachters long!'],
        required: [true, 'Firstname is required!'],
    },
    lastname: {
        type: String,
        minLength: [3, 'Lastname must be at least 3 charachters long!'],
        required: [true, 'Lastname is required!'],
    },
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 characters long!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [10, 'Password should be at least 4 characters long!']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
