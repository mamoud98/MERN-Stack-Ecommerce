const { Router } = require("express");
const {
  getToken,
  processPayment,
} = require("../controller/braintreeController");
const { isAuth } = require("../middleware/authMiddleware");
const router = Router();

router.get("/braintree/getToken", isAuth, getToken);
router.post("/braintree/processPayment", isAuth, processPayment);

module.exports = router;
