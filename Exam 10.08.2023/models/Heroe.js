const mongoose = require('mongoose');

const heroeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'The name is required and should be at least 2 characters']
    },
    species: {
        type: String,
        required: true,
        minLength: [3, 'The species is required and should be at least 3 characters.']
    },
    skinColor: {
        type: String,
        required: true,
        minLength: [3, 'The skin color is required and should be at least 3 characters.']
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: [3, 'The eye color is required and should be a at least 3 characters.']
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
        message: 'Invalid URL!',
    },
    description: {
        type: String,
        required: true,
        minLength: [5, "The description is required and should be at least 5 and no longer than 500 characters."],
        maxLength: [500, "The description is required and should be at least 5 and no longer than 500 characters."]
    },
    owner: {
        type: mongoose.Types.ObjectId,
        red: 'User',
    },
    votes: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: [],
    },
})

const Heroe = mongoose.model('Heroe', heroeSchema);

module.exports = Heroe;