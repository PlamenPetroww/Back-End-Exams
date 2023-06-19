const router = require('express').Router();
const { getAll, getRecent } = require('../services/courseService');

router.get('/', async (req, res) => {

    let view;
    let courses = [];

    if (req.user) {
        view = 'home/index';
        courses = await getAll(req.query.search);
    } else {
        view = 'home/guest-home';
        courses = await getRecent();
    }

    res.render(view, { courses, search: req.query.search });

});

module.exports = router;