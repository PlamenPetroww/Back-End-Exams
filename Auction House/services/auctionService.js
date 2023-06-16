const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).populate('author');

exports.create = (ownerId, bidData) => Auction.create({ ...bidData, author: ownerId});

exports.getOne = (id) => Auction.findById(id).lean();

exports.deleteById = (id) => Auction.findByIdAndDelete(id);

exports.getById = (id) => Auction.findById(id).lean();


exports.buy = async (userId, offerId) => {

    const bid = await Auction.findById(offerId);

    bid.bidder.push(userId);

    return bid.save();
    
    
}