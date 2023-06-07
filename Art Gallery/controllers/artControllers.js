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
    const gallery = await artService.getbyId(req.params.id);
    const isAuthor = gallery.author == req.user?._id;
    gallery.isPublicated = gallery.users.map(x => x.toString()).includes(req.user._id.toString());
    
    res.render('art/details', { gallery, isAuthor })
});

module.exports = router;
