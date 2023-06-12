const router = require('express').Router();
const isAuth = require('./authController');
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');


router.get('/create', (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bookData = { ...req.body, author: req.user._id };

    try {
        const book = await bookService.create(req.user._id, bookData);
        res.redirect('/book/catalog');
    } catch (error) {
        res.render('book/create', { error: getErrorMessage(error), bookData })
    }
});

router.get('/catalog', async (req, res) => {
    const book = await bookService.getAll()
    res.render('book/catalog', { book })
});

router.get('/:bookId/details', async (req, res) => {

    const book = await bookService.getOneDetailed(req.params.bookId).lean();

    const isAuthor = book.author?.toString() == req.user._id;

    res.render('book/details', { ...book, isAuthor })
});

module.exports = router;