const router = require('express').Router();
const isAuth = require('./authController');
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');
const userService = require('../services/userService');


router.get('/create', (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bookData = req.body;

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

    const isAuthor = book.owner?.toString() == req.user?._id;
    const wishingListId = book.wishingList.map(user => user._id.toString());
    const isWished = wishingListId.includes(req.user?._id.toString())

    res.render('book/details', { ...book, isAuthor, isWished })
});

router.get('/:bookId/edit', isAuth, async (req, res) => {
    try {
        const book = await bookService.getOne(req.params.bookId).lean();
        res.render('book/edit', { book });
    } catch (error) {
        res.render('book/edit', { error: getErrorMessage(error), });
    }
});

router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookData = req.body;
    try {
        const book = await bookService.edit(req.params.bookId, bookData);
        res.redirect(`/book/${req.params.bookId}/details`);
    } catch (error) {
        const book = await bookService.getOne(req.params.bookId).lean();
        res.render('book/edit', { bookData: bookData, error: getErrorMessage(error), book: book })
    }
});

router.get('/:bookId/delete', isAuth, async (req, res) => {
    try {
        await bookService.delete(req.params.bookId);
    } catch (error) {
        return res.status(400).render({ error: getErrorMessage(error) })
    }
    return res.redirect('/');
});

router.get('/:id/wished', isAuth, async (req, res) => {
    const book = await bookService.getOne(req.params.id);
    const user = await userService.getOne(req.user._id);

    book.wishingList.push(req.user._id);
    user.shares.push(book);

    await book.save();
    await user.save();

    res.redirect(`/book/${req.params.id}/details`);
});



module.exports = router;