const issuesModel = require("../issues/issues-model");

module.exports = async (req, res, next) => {
  try {
    const issue = await issuesModel.findById(req.params.issueId);
    if (!issue) {
      return res
        .status(404)
        .json({
          message: `No issue found with the id of ${req.params.issueId}`
        });
    }
    next();
  } catch (err) {
    next();
  }
};
