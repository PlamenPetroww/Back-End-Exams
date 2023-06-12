const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'The title must be at least 2 characters'],
        required: true,
    },
    author: {
        type: String,
        minLength: [5, 'The Author must be at least 5 charachters'],
        required: true,
    },
    image: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            messages: 'Invalid option!',
        },
        required: true,
    },
    bookReview: {
        type: String,
        minLength: [10, 'The review must be at least 10 characters'],
        required: true,
    },
    genre: {
        type: String,
        minLength: [3, 'The Genre must be at least 3 charachters'],
        required: true,
    },
    start: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    wishingList: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;