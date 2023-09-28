const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        // TODO: redirect to ...
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    /* check im registerPage for username, email, password, repeatPassword */
    const { firstname, lastname, email, password, repeatPassword } = req.body;

    try {
        const token = await authService.register(firstname, lastname, email, password, repeatPassword);

        res.cookie('auth', token);
        // TODO: redirect to ...
        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) })
    }
});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie('auth');

    // TODO: redirect to ... ?
    res.redirect('/');
});

module.exports = router;