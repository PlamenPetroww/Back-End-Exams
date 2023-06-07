const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const artService = require('../services/artService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/gallery', (req, res) => {
    res.render('art/gallery');
});

router.get('/create', isAuth, (req, res) => {
    res.render('art/create');
});

router.post('/create', isAuth, async (req, res) => {
    const artInfo = req.body;

    try {
        await artService.create(req.user._id, artInfo);
        res.redirect('/art/gallery');
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }
});

module.exports = router;
