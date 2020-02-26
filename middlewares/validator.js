module.exports = prop => (req, res, next) => {
  if (req.body[prop]) {
    next();
  } else {
    res.status(400).json({ errorMessage: `${prop} is a required field.` });
  }
};
