const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        minLenght: [4, 'The game musst be min 4 charachter long!'],
        required: true,
    },
    image: {
        type: String,
        validate: /^https?:\/\//,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    description: {
        type: String,
        minLength: [10, 'The description musst be minimum 10 charachters long!'],
        required: true,
    },
    genre: {
        type: String,
        minLength: [4, 'The genre musst be minimum 4 characters long'],
        required: true,
    },
    platform: {
        type: String,
        enum: {
            values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
            message: 'Invalid platform!',
        },
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        red: 'User',
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        red: 'User',
    }],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;