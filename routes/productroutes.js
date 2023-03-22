const express = require("express");
const {
  getProductNamePrice,
  getProductName,
  getProduct,
  addProduct,
  findProduct,
  updateProduct,
  deletePrtodut,
  findProductById,
  findProductByName,
} = require("../controllers/productcontroller.js");
const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();

router.get("/productlist", authMiddleware, getProduct);
router.get("/find",authMiddleware, findProduct);

router.post("/addproduct",authMiddleware,  addProduct);
router.patch("/updateproduct", authMiddleware, updateProduct);

router.delete("/deleteproduct",authMiddleware,  deletePrtodut);
router.get("/findbyid",authMiddleware,  findProductById);

router.get("/findbyname",authMiddleware,  findProductByName);
router.get("/names",authMiddleware,  getProductName);

router.get("/nameandprice",authMiddleware,  getProductNamePrice);

module.exports = router;
