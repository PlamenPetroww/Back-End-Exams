const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
            required: [true, 'Comment message is required'],
        }
    }]
});

const Pet = mongoose.model('Pets', photoSchema);

module.exports = Pet;