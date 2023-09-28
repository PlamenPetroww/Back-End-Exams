const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorUtils");
const heroeService = require("../services/heroeService");
const User = require("../models/User");
const Heroe = require("../models/Heroe");

router.get("/catalog", async (req, res) => {
  const heroe = await heroeService.getAll();

  res.render("heroe/catalog", { heroe });
});

router.get("/create", isAuth, (req, res) => {
  res.render("heroe/create");
});

router.post("/create", isAuth, async (req, res) => {
  const heroeData = req.body;

  try {
    await heroeService.create(req.user._id, heroeData);
    res.redirect("/heroe/catalog");
  } catch (error) {
    return res.render("heroe/create", {
      body: heroeData,
      error: getErrorMessage(error),
    });
  }
});

router.get("/:id/details", async (req, res) => {
  const heroe = await heroeService.getOne(req.params.id);
  const isOwner = heroe.owner?.toString() === req.user?._id.toString();
  const creatorId = heroe.owner;
  const creator = await User.findById(creatorId);
  const creatorFirstName = creator.firstname;
  const creatorLastName = creator.lastname;
  const isVoted = heroe.votes?.some((id) => id == req.user?._id);
  const votesLength = heroe.votes?.length || 0;

  res.render("heroe/details", {
    heroe,
    isOwner,
    creatorFirstName,
    creatorLastName,
    isVoted,
    votesLength,
  });
});

router.get("/:id/edit", isAuth, async (req, res) => {
  const heroeId = await heroeService.getOne(req.params.id);
  const isOwnerId = heroeId.owner._id.toString();
  if (req.user._id !== isOwnerId) {
    return res.redirect("/404");
  }

  const heroe = await heroeService.getOne(req.params.id);

  try {
    res.render("heroe/edit", { heroe });
  } catch (error) {
    res.render("heroe/edit", { error: getErrorMessage(error) });
  }
});

router.post("/:id/edit", isAuth, async (req, res) => {
  const heroeId = await heroeService.getOne(req.params.id);
  const isOwnerId = heroeId.owner._id.toString();
  if (req.user._id !== isOwnerId) {
    return res.redirect("/404");
  }

  const heroeData = req.body;

  try {
    const data = await heroeService.edit(req.params.id, heroeData);
    res.redirect(`/heroe/${req.params.id}/details`);
  } catch (error) {
    const heroe = await heroeService.getOne(req.params.id);
    res.render("heore/edit", {
      heroeData: heroeData,
      error: getErrorMessage(error),
      heroe: heroe,
    });
  }
});

router.get("/:id/delete", isAuth, async (req, res) => {
  const heroeId = await heroeService.getOne(req.params.id);
  const isOwnerId = heroeId.owner._id.toString();
  if (req.user._id !== isOwnerId) {
    return res.redirect("/404");
  }

  try {
    await heroeService.deleteById(req.params.id);
  } catch (error) {
    return res.render({ error: getErrorMessage(error) });
  }
  return res.redirect("/heroe/catalog");
});

router.get("/:id/vot", isAuth, async (req, res) => {
  const heroeId = req.params.id;
  const userId = req.user._id;
  const heroe = await Heroe.findById(heroeId);
  const isOwner = heroe.owner === userId;

  if (!isOwner && !heroe.votes.includes(userId)) {
    await heroeService.voted(heroeId, userId);
  }

  res.redirect(`/heroe/${heroeId}/details`);
});

module.exports = router;
