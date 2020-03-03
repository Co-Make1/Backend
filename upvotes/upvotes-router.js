const router = require("express").Router({
  mergeParams: true
});
const restricted = require("../middlewares/restricted");
const validateUpvotesId = require("../middlewares/validateUpvotesId");
const validateUpvotesEditingRights = require("../middlewares/validateUpvotesEditingRights");

const db = require("./upvotes-model");


router.post("/", restricted, async (req, res, next) => {
  const issue_id = Number(req.params.issue_id)
  const user_id = Number(req.params.id)
  const upvote = { upvotes: 1, issue_id, user_id };
  try {
    console.log(upvote);
    const newUpvote = await db.add(upvote);
    console.log(`newUpvote: `, newUpvote)
    res.status(201).json(newUpvote);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:upvoteId",
  restricted,
  validateUpvotesId,
  validateUpvotesEditingRights,
  async (req, res, next) => {
    try {
      const { upvoteId } = req.params;
      const deletedCount = await db.remove(upvoteId);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
