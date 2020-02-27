const router = require("express").Router();
const restricted = require("../middlewares/restricted");
const validateCommentId = require("../middlewares/validateCommentId");

const db = require("./comments-model");

router.get("/", restricted, async (req, res, next) => {
  try {
    const comments = await db.find();
    console.log(comments);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newComment = await db.add(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateCommentId, restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateCommentId, restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await db.update(id, req.body);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateCommentId, restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.remove(id);

    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
