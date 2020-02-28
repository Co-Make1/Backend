const router = require("express").Router({
  mergeParams: true
});
const commentsRouter = require("../comments/comments-router");
const restricted = require("../middlewares/restricted");
const validateIssueId = require("../middlewares/validateIssueId");
const validateIssueEditingRights = require("../middlewares/validateIssueEditingRights");
const validator = require("../middlewares/validator");
const validateId = require("../middlewares/validateId");

const db = require("./issues-model");

router.use("/:issueId/comments", commentsRouter);

router.get("/", restricted, validateId, async (req, res, next) => {
  try {
    const issues = await db.find();
    res.json(issues);
  } catch (err) {
    next(err);
  }
});

router.get("/user", restricted, async (req, res, next) => {
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
  validator("hazard_level"),
  restricted,
  async (req, res, next) => {
    try {
      const newissue = await db.add(req.body);
      res.status(201).json(newissue);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:issueId",
  restricted,
  validateId,
  validateIssueId,
  async (req, res, next) => {
    try {
      const { issueId } = req.params;
      const issue = await db.findById(issueId);
      res.json(issue);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:issueId",
  restricted,
  validateId,
  validateIssueId,
  validateIssueEditingRights,
  async (req, res, next) => {
    try {
      const { issueId } = req.params;
      const issue = await db.update(issueId, req.body);
      res.json(issue);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:issueId",
  restricted,
  validateId,
  validateIssueId,
  validateIssueEditingRights,
  async (req, res, next) => {
    try {
      const { issueId } = req.params;
      const deletedCount = await db.remove(issueId);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
