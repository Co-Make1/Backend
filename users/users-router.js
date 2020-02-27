const router = require("express").Router();
// const admin = require("../middlewares/admin");
const restricted = require("../middlewares/restricted");
const validateId = require("../middlewares/validateId");

const issuesRouter = require("../issues/issues-router");

const db = require("./users-model");

router.use("/:id/issues", issuesRouter);

router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await db.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:issueId", validateId, restricted, async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const user = await db.findById(issueId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.update(id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.remove(id);

    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
