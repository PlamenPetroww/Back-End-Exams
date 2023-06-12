const router = require('express').Router();
const artService = require('../services/artService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const publicationResult = await artService.getAll();
    const publications = publicationResult.map(x => ({ ...x, shareCount: x.usersShared.length }))
    res.render('home', { publications });
});

router.get('/profile',async (req, res) => {
    const user = await userService.getOne(req.user._id).populate('publications').lean();
    const publicationTitles = user.publications.map(x => x.title).join(', ');
    res.render('home/profile', {...user, publicationTitles});
});

module.exports = router;