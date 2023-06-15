const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');


// TODO: add routes for the new Controller
router.use(homeController);
router.use(authController);
router.all('*', (req, res) => {
    res.render('home/404'); 
});

module.exports = router;