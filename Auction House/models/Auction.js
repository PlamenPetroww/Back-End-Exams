const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema ({
    title: {
        type: String,
        minLength: [4, 'The title must be at least 4 charatcers long!'],
        required: true,
    },
    description: {
        type: String,
        maxLength: [200, 'The description must be at least 200 charatcers long!'],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Vehicles, Real Estate, Electronics, Furniture, Other'],
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    bidder: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;