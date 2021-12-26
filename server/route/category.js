const { Router } = require("express");
const {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  listCategory,
} = require("../controller/categoryController");
const { isAuth } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

const router = Router();

router.post("/category", isAuth, isAdmin, addCategory);
router.get("/category/:categoryId", isAuth, getCategory);
router.delete("/category/:categoryId", isAuth, isAdmin, deleteCategory);
router.put("/category/:categoryId", isAuth, isAdmin, updateCategory);
router.get("/category",  listCategory);

module.exports = router;
