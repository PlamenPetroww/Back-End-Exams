const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({

    title: {
        type: String,
        minLength: [6, 'The title must be at least 6 characters'],
        required: [true, 'Please write the Title name'],
    },
    paintingTechnique: {
        type: String,
        maxLength: [15, 'The painting technique must be max 15 characters'],
        required: true,
    },
    artPicture: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
        message: 'Invalid URL!',
    },
    certificate: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            messages: 'Invalid option!',
        },
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;