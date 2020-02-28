const router = require("express").Router();
const restricted = require("../middlewares/restricted");
const validateIssueId = require("../middlewares/validateIssueId");
const validator = require("../middlewares/validator");
const validateId = require("../middlewares/validateId");

const db = require("./issues-model");

router.get("/", restricted, async (req, res, next) => {
  try {
    const issues = await db.find();
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

router.get(
  "/:id",
  restricted,
  validateId,
  validateIssueId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await db.findById(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id", restricted, validateIssueId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const issue = await db.update(id, req.body);
    res.json(issue);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, validateIssueId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.remove(id);

    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
