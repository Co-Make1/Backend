const usersModel = require("../users/users-model");

module.exports = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: `No user found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
