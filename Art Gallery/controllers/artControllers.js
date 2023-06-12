const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const artService = require('../services/artService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/gallery', async (req, res) => {
    const gallery = await artService.getAll();

    res.render('art/gallery', { gallery });
});

router.get('/create', isAuth, (req, res) => {
    res.render('art/create');
});

router.post('/create', isAuth, async (req, res) => {
    const artData = req.body;

    try {
        await artService.create(req.user._id, artData);
        res.redirect('/');
    } catch (error) {
        return res.render('art/gallery', { body: artData, error: getErrorMessage(error) });
    }
});

router.get('/:id/details', async (req, res) => {
    const gallery = await artService.getById(req.params.id);
    const isAuthor = gallery.author == req.user?._id;

    res.render('art/details', { gallery, isAuthor })
});

router.get('/:id/edit', isAuth, async (req, res) => {
    const gallery = await artService.getOne(req.params.id);

    try {
        res.render('art/edit', { gallery });
    } catch (error) {
        res.render('art/edit', { error: getErrorMessage(error) });
    }
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const publicData = req.body;
    try {
        const publication = await artService.edit(req.params.id, publicData)
        res.redirect(`/art/${req.params.id}/details`,);
    } catch (error) {
        const publication = await artService.getOne(req.params.id);
        res.render('art/edit', { publicData: publicData, error: getErrorMessage(error), publication: publication });
    }
});

module.exports = router;
