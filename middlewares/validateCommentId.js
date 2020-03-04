const commentModel = require("../comments/comments-model");

module.exports = async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      return res
        .status(404)
        .json({
          message: `No comment found with the id of ${req.params.commentId}`
        });
    }
    next();
  } catch (err) {
    next();
  }
};
