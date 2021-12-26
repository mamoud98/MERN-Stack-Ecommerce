const { Router } = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  purchaseHistory
} = require("../controller/userController");
const { isAuth } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

const router = Router();

router.get("/secret/:userId", isAuth, isAdmin, getUsers);
router.get("/user/:userId", isAuth, getUser);
router.put("/user/:userId", isAuth, updateUser);
router.get("/order/by/user", isAuth, purchaseHistory);




module.exports = router;
