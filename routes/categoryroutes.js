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
  limitChildProPrice,
  childCategory,

  getMenPro,
  getMenTrend,
  getMenShirt,
  getMenTrouser,
  getMenMax,
  getMenMin,
  limitMenProPrice,
  menCategory,

  getWoPro,
  getWoTrend,
  getWoShirt,
  getWoKurti,
  getWoSaree,
  getWoMax,
  getWoMin,
  limitWoProPrice,
  woCategory,

  getAllBags,
  getMenBags,
  getWoBags,
  getBagFilterByPrice,
  getMinPriceBag,
  getMaxPriceBag,
  bagCategory,

  getAllWatch,
  getWoWatch,
  getMenWatch,
  getWatchFilterByPrice,
  getMaxPriceWatch,
  getMinPriceWatch,
  watchCategory,
} = require("../controllers/categorycontroller.js");

//const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();
var cors = require('cors');
 
var corsOptions = {
  origin: 'http://localhost:5500S',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


router.get("/children/all", cors(corsOptions), getChildrenPro);
router.get("/children/trendy",cors(corsOptions), getChildTrend);
router.get("/children/shirts",cors(corsOptions), getChildShirt);
router.get("/children/trousers",cors(corsOptions), getChildTrouser);
router.get("/children/maxprice", cors(corsOptions),getChildMax);
router.get("/children/minprice",cors(corsOptions), getChildMin);
router.get("/children/filterbyprice",cors(corsOptions), limitChildProPrice);
router.get("/categories/children",cors(corsOptions),childCategory);


router.get("/women/all",cors(corsOptions), getWoPro);
router.get("/women/trendy",cors(corsOptions), getWoTrend);
router.get("/women/shirts",cors(corsOptions), getWoShirt);
router.get("/women/kurtis",cors(corsOptions), getWoKurti);
router.get("/women/sarees", cors(corsOptions),getWoSaree);
router.get("/women/maxprice",cors(corsOptions), getWoMax);
router.get("/women/minprice", cors(corsOptions),getWoMin);
router.get("/women/filterbyprice",cors(corsOptions), limitWoProPrice);
router.get("/women/categories", cors(corsOptions),woCategory);


router.get("/men/all",cors(corsOptions), getMenPro);
router.get("/men/trendy",cors(corsOptions), getMenTrend);
router.get("/men/shirts", cors(corsOptions),getMenShirt);
router.get("/men/trousers",cors(corsOptions), getMenTrouser);
router.get("/men/maxprice",cors(corsOptions), getMenMax);
router.get("/men/minprice",cors(corsOptions), getMenMin);
router.get("/men/filterbyprice",cors(corsOptions), limitMenProPrice);
router.get("/men/categories", cors(corsOptions),menCategory);


 
router.get("/bags/all",cors(corsOptions), getAllBags);
router.get("/bags/men",cors(corsOptions), getMenBags);
router.get("/bags/women", cors(corsOptions),getWoBags);
router.get("/bags/filterbyprice",cors(corsOptions), getBagFilterByPrice);
router.get("/bags/maxprice",cors(corsOptions), getMaxPriceBag);
router.get("/bags/minprice",cors(corsOptions), getMinPriceBag);
router.get("/bags/categories",cors(corsOptions), bagCategory);



router.get("/watches/all",cors(corsOptions), getAllWatch);
router.get("/watches/men",cors(corsOptions), getMenWatch);
router.get("/watches/women",cors(corsOptions), getWoWatch);
router.get("/watches/filterbyprice",cors(corsOptions), getWatchFilterByPrice);
router.get("/watches/maxprice",cors(corsOptions), getMaxPriceWatch);
router.get("/watches/minprice",cors(corsOptions), getMinPriceWatch);
router.get("/categories/watch",cors(corsOptions), watchCategory);




router.get("/list/:type",cors(corsOptions), getCategory);
router.delete("/remove_category",cors(corsOptions), deleteCatById);
router.put("/addproduct_category",cors(corsOptions), addProduct);
router.get("/categorybyname",cors(corsOptions), getCategoryId);
router.put("/remove_product",cors(corsOptions), removeProduct);
router.get("/addsubcategory", cors(corsOptions),createSubCategory);
router.get("/children/product",cors(corsOptions),createChildCat)

module.exports = router;
