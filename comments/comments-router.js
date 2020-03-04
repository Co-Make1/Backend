const router = require("express").Router({
  mergeParams: true
});
const restricted = require("../middlewares/restricted");
const validateCommentId = require("../middlewares/validateCommentId");
const validateCommentEditingRights = require("../middlewares/validateCommentEditingRights");
const validateId = require("../middlewares/validateId");
const validateIssueId = require("../middlewares/validateIssueId");
const validator = require("../middlewares/validator");

const db = require("./comments-model");

router.get(
  "/allComments",
  // restricted,
  // validateId,
  // validateIssueId,
  // validateIssueId,
  async (req, res, next) => {
    try {
      const comments = await db.find();
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  // restricted,
  // validateId,
  // validateIssueId,
  async (req, res, next) => {
    const { issueId } = req.params;
    try {
      const comments = await db.findByIssueId(issueId);
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  // restricted,
  validateId,
  validator("comment"),
  validateIssueId,
  async (req, res, next) => {
    let { body } = req;
    body = { ...body, issue_id: req.params.issue_id, user_id: req.params.id };
    try {
      console.log(body);
      const newComment = await db.add(body);
      res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:commentId",
  // restricted,
  validateId,
  validateCommentId,
  validateIssueId,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const user = await db.findById(commentId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:commentId",
  // restricted,
  validateId,
  validateCommentId,
  validateCommentEditingRights,
  validateIssueId,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const comment = await db.update(commentId, req.body);
      res.json(comment);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:commentId",
  // restricted,
  validateId,
  validateCommentId,
  validateCommentEditingRights,
  validateIssueId,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const deletedCount = await db.remove(commentId);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
