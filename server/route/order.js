const { Router } = require("express");
const {
  create,
  getStatusValues,
  updateOrderStatus,
  listOrders,
} = require("../controller/orderController");
const { isAuth } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");
const { addOrderToUserHistory } = require("../controller/userController");
const { decreaseQuantity } = require("../controller/ProductController");

const router = Router();

router.post(
  "/order/create",
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.get("/order/status-values", isAuth, isAdmin, getStatusValues);
router.get("/order/list", isAuth, isAdmin, listOrders);

router.put("/order/status/:orderId", isAuth, isAdmin, updateOrderStatus);

module.exports = router;
