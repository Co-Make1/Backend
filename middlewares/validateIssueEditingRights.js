const issuesModel = require("../issues/issues-model");

module.exports = async (req, res, next) => {
  try {
    const issue = await issuesModel.findById(req.params.issueId);
    if (Number(issue.user_id) !== Number(req.params.id)) {
      res.status(403).json({
        message: `User can only edit issues they have created.`
      });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};
