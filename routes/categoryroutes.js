const express = require("express");
const {
  createCategory,
  getCategory,
  deleteCatById,
  addProduct,
  getCategoryId,
  removeProduct,
} = require("../controllers/categorycontroller.js");
//const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();

router.post("/addcategory", createCategory);
router.get("/categorylist", getCategory);
router.delete("/remove_category", deleteCatById);
router.put("/addproduct_category", addProduct);
router.get("/categorybyname", getCategoryId);
router.put("/remove_product", removeProduct);

module.exports = router;
