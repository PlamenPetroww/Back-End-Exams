const router = require('express').Router();
const User = require('../models/User');
const heroeService = require('../services/heroeService')

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/profile', async (req, res) => {
  const heroe = await heroeService.getOne(req.params.id);
  /* const creatorId = heroe.owner;
  const creator = await User.findById(creatorId);
  const creatorFirstName = creator.firstname;
    const creatorLastName = creator.lastname; */
//   const user = await heroeService.getOne(req.user._id).populate("votes");
  res.render('home/profile', {...heroe});
});

module.exports = router;