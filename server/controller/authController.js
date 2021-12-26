const User = require("../model/user");
const { createToken } = require("../middleware/genarateToken");
const { handleDbErrors } = require("../helper/handelErrors");
exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    const data = await user.save();
    data.password = undefined;
    const token = createToken(user._id);
    res.cookie("jwt", token);
    res.status(200).json({
      user: data,
      token,
    });
  } catch (err) {
    const error = handleDbErrors("user validation failed", err);
    res.json({
      error,
    });

    console.log(err);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    user.password = undefined;

    const token = createToken(user._id);
    res.cookie("jwt", token);
    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    const error = handleDbErrors("user validation failed", err);
    res.json({
      error,
    });

    console.log(err);
  }
};
exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Signout success" });
  } catch (error) {
    console.log(error);
  }
};
