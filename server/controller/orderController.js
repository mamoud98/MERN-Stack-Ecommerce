const { Order } = require("../model/order");

exports.create = async (req, res) => {
  req.body.order.user = req.user;
  // console.log(req.user);
  const order = await new Order(req.body.order);
  const data = await order.save();
  try {
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").options.enm);
  // res.json("ddd");
  // console.log(res);
};
exports.updateOrderStatus = async (req, res) => {
  
  const order = await Order.update(
    { _id: req.params.orderId },
    { $set: { status: req.body.status } }
  );
  console.log(req.params.orderId);
  console.log(req.body.status);
  try {
    res.json(order);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
exports.listOrders = async (req, res) => {
  const order = await Order.find()
    .populate("user", "_id name address")
    .sort("-created");
  try {
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};
