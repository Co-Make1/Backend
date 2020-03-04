const router = require("express").Router({
  mergeParams: true
});
const upvotesRouter = require("../upvotes/upvotes-router");
const commentsRouter = require("../comments/comments-router");
const restricted = require("../middlewares/restricted");
const validateId = require("../middlewares/validateId")
const validateIssueId = require("../middlewares/validateIssueId");
const validateIssueEditingRights = require("../middlewares/validateIssueEditingRights");
const validator = require("../middlewares/validator");

const db = require("./issues-model");

router.use("/:issue_id/comments", commentsRouter);
router.use("/:issue_id/upvotes", upvotesRouter);

router.get("/", /*restricted,*/ validateId, async (req, res, next) => {
  try {
    const issues = await db.find();
    res.json(issues);
  } catch (err) {
    next(err);
  }
});

router.get("/user", /*restricted,*/
validateId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const issues = await db.findByUserId(id);
    res.json(issues);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validator("issue"),
  validator("issue_description"),
  validator("city"),
  validator("state"),
  validator("zip_code"),
  // validator("user_id"),
  validator("hazard_level"),
  /*restricted,*/
  validateId,
  async (req, res, next) => {
    try {
      let { body } = req
      body = {...body, user_id: Number(req.params.id)}
      const newissue = await db.add(body);
      res.status(201).json(newissue);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:issue_id", /*restricted,*/
validateId, validateIssueId, async (req, res, next) => {
  try {
    const { issue_id } = req.params;
    const issue = await db.findById(issue_id);
    res.json(issue);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:issue_id",
  /*restricted,*/
  validateId,
  validateIssueId,
  validateIssueEditingRights,
  async (req, res, next) => {
    try {
      const { issue_id } = req.params;
      const issue = await db.update(issue_id, req.body);
      res.json(issue);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:issue_id",
  /*restricted,*/
  validateId,
  validateIssueId,
  validateIssueEditingRights,
  async (req, res, next) => {
    try {
      const { issue_id } = req.params;
      const deletedCount = await db.remove(issue_id);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
