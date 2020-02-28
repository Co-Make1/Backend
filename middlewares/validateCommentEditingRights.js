const commentsModel = require("../comments/comments-model");

module.exports = async (req, res, next) => {
  try {
    const comment = await commentsModel.findById(req.params.commentId);
    if (Number(comment.user_id) !== Number(req.params.id)) {
      res.status(403).json({
        message: `User can only edit comments they have created.`
      });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};
