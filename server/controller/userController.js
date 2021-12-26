const User = require("../model/user");
const { Order } = require("../model/order");

exports.getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.getUser = async (req, res) => {
  const { userId } = req.params;
  const users = await User.findById(userId).select("-password");
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  console.log(req.body);
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
  });

  try {
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.addOrderToUserHistory = async (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });
  await User.findOneAndUpdate(
    { _id: req.user },
    { $push: { history: history } },
    { new: true }
  );
  try {
    next();
  } catch (error) {
    res.json(error);
  }
};
exports.purchaseHistory = async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({ user: _id })
    .populate("user", "name _id")
    .sort("-created");

  try {
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
