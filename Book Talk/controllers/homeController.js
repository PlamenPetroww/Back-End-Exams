const router = require('express').Router();
const bookService = require('../services/bookService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const booksResult = await bookService.getAll();
    const books = booksResult.map(x => ({ ...x }));

    res.render('home', { books });
});

router.get('/profile', async (req, res) => {
    const user = await userService.getOne(req.user._id).populate('book').lean();
    const sharedTitles = user.shares.map(x => x.title);
    res.render('home/profile', { ...user, sharedTitles });
});

module.exports = router;