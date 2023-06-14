const Book = require('../models/Book');

exports.create = (ownerId, bookData) => Book.create({ ...bookData, owner: ownerId });

exports.getAll = () => Book.find({}).lean();

exports.getOne = (bookId) => Book.findById(bookId);

exports.getOneDetailed = (bookId) => Book.findById(bookId).populate('author');

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, {runValidators: true});

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);