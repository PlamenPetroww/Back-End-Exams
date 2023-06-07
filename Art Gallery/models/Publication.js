const mongoose = require('mongoose');

const myPublicationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    paintingTechnique: {
        tpye: String,
        required: true,
    },
    artPitcure: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    userPublications: {
        type: mongoose.Types.ObjectId,
        red: 'User',
    }
});

const Publication = mongoose.model('Publication', myPublicationSchema);

module.exports = Publication;