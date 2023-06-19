const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtils');
const Course = require('../models/Course');


router.get('/:id/details', async (req, res) => {
    const course = await courseService.getById(req.params.id);

    const isOwner = course.owner == req.user?._id;
    course.enrolled = course.users.map(x => x.toString()).includes(req.user._id.toString());

    res.render('course/details', { course, isOwner });
});

router.get('/create', isAuth, (req, res) => {
    res.render('course/create');
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.create(req.user._id, courseData);
        res.render('/');
    } catch (error) {
        res.render('course/create', { body: courseData, error: getErrorMessage(error) })
    }
});

router.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const course = await courseService.getOne(req.params.id);
        res.render('course/edit', { course });
    } catch (error) {
        res.render('course/edit', { error: getErrorMessage(error) });
    }
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const courseData = req.body;
    try {
        const course = await courseService.edit(req.params.id, courseData);
        res.redirect(`/course/${req.params.id}/details`);
    } catch (error) {
        const course = await courseService.getOne(req.params.id);
        res.render('course/edit', { courseData: courseData, error: getErrorMessage(error), course: course });
    }
});

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        await courseService.deleteById(req.params.id)
    } catch (error) {
        return res.status(400).render({ error: getErrorMessage(error) });
    }
    return res.redirect('/');
});

const enrollUser = require('../services/courseService');

router.get('/:id/enroll', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Course.findById(courseId);

    const isOwner = course.owner === userId;

    if (!isOwner && !course.users.includes(userId)) {
        await courseService.enrollUser(courseId, userId);
    }

    res.redirect(`/course/${courseId}/details`);
});

module.exports = router;