const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const artService = require('../services/artService');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/gallery', async (req, res) => {
    const gallery = await artService.getAll();

    res.render('art/gallery', { gallery });
});

router.get('/create', isAuth, (req, res) => {
    res.render('art/create');
});

router.post('/create', isAuth, async (req, res) => {
    //const artData = req.body;
    const artData = {...req.body, author: req.user._id}

    try {
        const publication = await artService.create(req.user._id, artData);
        await userService.addPublication(req.user._id, publication._id)
        res.redirect('/art/gallery');
    } catch (error) {
        res.render('art/create', { error: getErrorMessage(error), artData });
    }
});

router.get('/:publicationId/details', async (req, res) => {
    const gallery = await artService.getOneDetailed(req.params.publicationId).lean();

    const isAuthor = gallery.author._id == req.user._id;
    const usersSharedIds = gallery.usersShared.map(user => user._id.toString());
    const isShared = usersSharedIds.includes(req.user._id.toString());

    console.log(isShared)

    res.render('art/details', { ...gallery, isAuthor, isShared })
});

router.get('/:id/edit', isAuth, async (req, res) => {

    try {
        const gallery = await artService.getOne(req.params.id).lean();
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
        const publication = await artService.getOne(req.params.id).lean();
        res.render('art/edit', { publicData: publicData, error: getErrorMessage(error), publication: publication });
    }
});

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        await artService.delete(req.params.id);
    } catch (error) {
        return res.status(400).render({ error: getErrorMessage(error) })
    }
    return res.redirect('/art/gallery');
});

router.get('/:id/share', isAuth, async (req, res) => {
    const publication = await artService.getOne(req.params.id);
    publication.usersShared.push(req.user._id);

    await publication.save();

    res.redirect('/');
});

module.exports = router;
