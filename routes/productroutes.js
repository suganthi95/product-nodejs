const express = require("express");
const {
  getProductNamePrice,
  getProductName,
  getProduct,
  addProduct,
  //findProduct,
  updateProduct,
  deletePrtodut,
  findProductById,
  findProductByName,
  lowToHighPrice,
  highToLowPrice,
  minPricePro,
  limitProPrice,
  proByCat,
  getRandomData
  
} = require("../controllers/productcontroller.js");
const authMiddleware = require("../helper/authMiddleware.js");
const router = express.Router();

router.get("/productlist", getProduct);
//router.get("/find", findProduct);
router.post("/addproduct", addProduct);
router.get("/findbyid",  findProductById);
router.get("/price/min", lowToHighPrice);
router.get("/price/max",highToLowPrice);
router.get("/low/price/product", minPricePro);
router.get("/price/limit", limitProPrice);
router.get("/kids", proByCat);
router.get("/random/trendy",getRandomData)



router.put("/updateproduct", updateProduct);

router.delete("/deleteproduct", deletePrtodut);


router.get("/findbyname",  findProductByName);
router.get("/names", getProductName);

router.get("/nameandprice",  getProductNamePrice);

module.exports = router;
