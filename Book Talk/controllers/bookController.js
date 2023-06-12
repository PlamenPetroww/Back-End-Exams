const router = require('express').Router();
const isAuth = require('./authController');
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');


router.get('/create', (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bookData = {...req.body, author: req.user._id};

    try {
        const book = await bookService.create(req.user._id, bookData);
        res.redirect('/book/catalog');
    } catch (error) {
        res.render('book/create', {error: getErrorMessage(error), bookData})
    }
});

module.exports = router;