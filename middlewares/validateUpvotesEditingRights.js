const upvotesModel = require("../upvotes/upvotes-model");

module.exports = async (req, res, next) => {
  try {
    const upvote = await upvotesModel.findById(req.params.upvoteId);
    if (Number(upvote.user_id) !== Number(req.params.id)) {
      return res.status(403).json({
        message: `User can only edit upvotes they have created.`
      });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};
