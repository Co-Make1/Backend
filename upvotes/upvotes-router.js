const router = require("express").Router({
  mergeParams: true
});
const restricted = require("../middlewares/restricted");
const validateUpvotesId = require("../middlewares/validateUpvotesId");
const validateUpvotesEditingRights = require("../middlewares/validateUpvotesEditingRights");

const db = require("./upvotes-model");


router.post("/", restricted, async (req, res, next) => {

  try {

    const issue_id = Number(req.params.issue_id)
    const user_id = Number(req.params.id)
    const upvote = { upvotes: 1, issue_id, user_id };
    const validator = await db.findBy({user_id: upvote.user_id})
    const valCheck = validator.filter(issue => issue.issue_id === upvote.issue_id && issue)
    
    if (valCheck.length > 0) {
      return res.status(400).json({message:`User with the id of ${upvote.user_id} has already upvoted issue with id of ${upvote.issue_id}` })
    }
      const newUpvote = await db.add(upvote);
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
