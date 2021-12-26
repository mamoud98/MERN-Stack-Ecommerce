const isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 1) {
      next();
    } else {
      res.status(401).json({
        message: "you are not Admin",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  isAdmin,
};
