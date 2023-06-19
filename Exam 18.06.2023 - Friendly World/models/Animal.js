const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: true,
        minLength: [2, 'The name of the animal must be least 2 charachters!']
    },
    years: {
        type: Number,
        required: true,
        min: [1, 'The years must be at least 1 year!'],
        max: [100, 'The years should be the most 100 years!'],
    },
    kind: {
        type: String,
        required: true,
        minLength: [3, 'The kind of the animal must be least 3 charachters!'],
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
    },
    need: {
        type: String,
        required: true,
        minLength: [3, 'The need must be at least 3 charachters!'],
        maxLength: [20, 'The need should be the most 20 charachters!'],
    },
    location: {
        type: String,
        required: true,
        minLength: [5, 'The location must be at least 5 charachters!'],
        maxLength: [15, 'The location must be at least 15 charachters!'],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'The description must be at least 5 charachters!'],
        maxLength: [50, 'The need should be the most 50 charachters!'],
    },
    donation: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;