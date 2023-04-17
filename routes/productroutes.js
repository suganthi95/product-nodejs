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
  test
} = require("../controllers/productcontroller.js");
const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();

router.get("/productlist", getProduct);
router.get("/find", findProduct);
router.get("/test",test);

router.post("/addproduct",addProduct);
router.patch("/updateproduct", authMiddleware, updateProduct);

router.delete("/deleteproduct",authMiddleware,  deletePrtodut);
router.get("/findbyid",authMiddleware,  findProductById);

router.get("/findbyname",authMiddleware,  findProductByName);
router.get("/names",authMiddleware,  getProductName);

router.get("/nameandprice",authMiddleware,  getProductNamePrice);

module.exports = router;
