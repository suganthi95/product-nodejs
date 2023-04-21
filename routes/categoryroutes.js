const express = require("express");
const {
  getChildrenPro,
  getChildTrend,
  getChildShirt,
  getChildTrouser,
  getCategory,
  deleteCatById,
  addProduct,
  getCategoryId,
  removeProduct,
  createSubCategory,
  createChildCat,
  getChildMax,
  getChildMin,
  limitProPrice
  
} = require("../controllers/categorycontroller.js");
//const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();

router.get("/children/all", getChildrenPro);
router.get("/children/trendy", getChildTrend);
router.get("/children/shirts", getChildShirt);
router.get("/children/trousers", getChildTrouser);
router.get("/children/maxprice", getChildMax);
router.get("/children/minprice", getChildMin);
router.get("/children/filterbyprice", limitProPrice);


router.get("/list/:type", getCategory);
router.delete("/remove_category", deleteCatById);
router.put("/addproduct_category", addProduct);
router.get("/categorybyname", getCategoryId);
router.put("/remove_product", removeProduct);
router.get("/addsubcategory", createSubCategory);
router.get("/children/product",createChildCat)

module.exports = router;
