const router = require('express').Router();
const artService = require('../services/artService');

router.get('/', async (req, res) => {
    const publicationResult = await artService.getAll();
    const publications = publicationResult.map(x => ({ ...x, shareCount: x.usersShared.length }))
    res.render('home', { publications });
})

module.exports = router;