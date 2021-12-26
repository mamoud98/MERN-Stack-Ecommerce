const { Router } = require("express");
const {
  productList,
  getProduct,
  getImageProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  getProductByCategory,
  listSearch,
  listBySearch,
} = require("../controller/ProductController");
const { isAuth } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");
const { img } = require("../middleware/uploadImage");
const router = Router();

router.get("/product", productList);
router.get("/product/:ProductId", getProduct);
router.get("/product/category/:ProductId", getProductByCategory);
router.get("/product/photo/:ProductId", getImageProduct);
router.get("/products/search", listSearch);
router.post("/products/filter", listBySearch);

router.post("/product", isAuth, isAdmin, img, CreateProduct);
router.put("/product/:ProductId", isAuth, isAdmin, img, UpdateProduct);
router.delete("/product/:ProductId", isAuth, isAdmin, DeleteProduct);

module.exports = router;
