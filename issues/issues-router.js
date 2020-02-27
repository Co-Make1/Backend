const router = require("express").Router({
  mergeParams: true
});
const restricted = require("../middlewares/restricted");
const validateIssueId = require("../middlewares/validateIssueId");
const validateIssueEditingRights = require("../middlewares/validateIssueEditingRights");
const validator = require("../middlewares/validator");

const db = require("./issues-model");

router.get("/", restricted, async (req, res, next) => {
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
  validator("zip_code"),
  validator("user_id"),
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

router.get("/:issueId", restricted, validateIssueId, async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const issue = await db.findById(issueId);
    res.json(issue);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:issueId",
  restricted,
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
