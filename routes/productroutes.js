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
var cors = require('cors');
 
var corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


router.get("/productlist",cors(corsOptions), getProduct);
//router.get("/find", findProduct);
router.post("/addproduct",cors(corsOptions), addProduct);
router.get("/findbyid", cors(corsOptions), findProductById);
router.get("/price/min",cors(corsOptions), lowToHighPrice);
router.get("/price/max",cors(corsOptions), highToLowPrice);
router.get("/low/price/product",cors(corsOptions), minPricePro);
router.get("/price/limit",cors(corsOptions), limitProPrice);
router.get("/kids",cors(corsOptions), proByCat);
router.get("/random/trendy",cors(corsOptions),getRandomData)



router.put("/updateproduct", cors(corsOptions), updateProduct);

router.delete("/deleteproduct", cors(corsOptions), deletePrtodut);


router.get("/findbyname", cors(corsOptions), findProductByName);
router.get("/names", cors(corsOptions), getProductName);

router.get("/nameandprice", cors(corsOptions), getProductNamePrice);

module.exports = router;
