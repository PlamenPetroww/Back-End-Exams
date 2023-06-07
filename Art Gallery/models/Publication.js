const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    paintingTechnique: {
        type: String,
        required: true,
    },
    artPicture: {
        type: String,
        required: true,
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
    userPublications: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    userCount: {
        type: Number,
        default: 0,
    }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;