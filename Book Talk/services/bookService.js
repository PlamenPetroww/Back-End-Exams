const Book = require('../models/Book');

exports.create = (ownerId, bookData) => Book.create({...bookData,author: ownerId});

exports.getAll = () => Book.find({}).lean();