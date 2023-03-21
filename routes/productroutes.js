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
const router = express.Router();

router.get("/productlist", getProduct);
router.get("/find", findProduct);

router.post("/addproduct", addProduct);
router.patch("/updateproduct", updateProduct);

router.delete("/deleteproduct", deletePrtodut);
router.get("/findbyid", findProductById);

router.get("/findbyname", findProductByName);
router.get("/names", getProductName);

router.get("/nameandprice", getProductNamePrice);

module.exports = router;
