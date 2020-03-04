const upvoteModel = require("../upvotes/upvotes-model");

module.exports = async (req, res, next) => {
  try {
    const upvote = await upvoteModel.findById(req.params.upvoteId);
    if (!upvote) {
     return res
        .status(404)
        .json({
          message: `No upvote found with the id of ${req.params.upvoteId}`
        });
    }
    next();
  } catch (err) {
    next();
  }
};
