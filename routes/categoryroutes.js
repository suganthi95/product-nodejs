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

  getMenPro,
  getMenTrend,
  getMenShirt,
  getMenTrouser,
  getMenMax,
  getMenMin,
  limitMenProPrice,

  getWoPro,
  getWoTrend,
  getWoShirt,
  getWoKurti,
  getWoSaree,
  getWoMax,
  getWoMin,
  limitWoProPrice,
  
} = require("../controllers/categorycontroller.js");
//const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();

router.get("/children/all", getChildrenPro);
router.get("/children/trendy", getChildTrend);
router.get("/children/shirts", getChildShirt);
router.get("/children/trousers", getChildTrouser);
router.get("/children/maxprice", getChildMax);
router.get("/children/minprice", getChildMin);
router.get("/children/filterbyprice", limitChildProPrice);

router.get("/women/all", getWoPro);
router.get("/women/trendy", getWoTrend);
router.get("/women/shirts", getWoShirt);
router.get("/women/kurtis", getWoKurti);
router.get("/women/sarees", getWoSaree);
router.get("/women/maxprice", getWoMax);
router.get("/women/minprice", getWoMin);
router.get("/women/filterbyprice", limitWoProPrice);


router.get("/men/all", getMenPro);
router.get("/men/trendy", getMenTrend);
router.get("/men/shirts", getMenShirt);
router.get("/men/trousers", getMenTrouser);
router.get("/men/maxprice", getMenMax);
router.get("/men/minprice", getMenMin);
router.get("/men/filterbyprice", limitMenProPrice);


router.get("/list/:type", getCategory);
router.delete("/remove_category", deleteCatById);
router.put("/addproduct_category", addProduct);
router.get("/categorybyname", getCategoryId);
router.put("/remove_product", removeProduct);
router.get("/addsubcategory", createSubCategory);
router.get("/children/product",createChildCat)

module.exports = router;
