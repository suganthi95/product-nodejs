// cart routes code here
const express = require("express");
const {
  getListByUserMailId,
  deleteProduct,
  getListByUserId,
  addProductToCart,
  addUserToCart,
  getCartList,
  updateCartList,
  deleteCartList,
} = require("../controllers/cartcontroller.js");
const authMiddleware = require("../helper/authMiddleware.js");

const router = express.Router();

router.post("/addusertocart", authMiddleware,  addUserToCart);
router.post("/addproduct",authMiddleware,  addProductToCart);
router.get("/getlist", authMiddleware, getCartList);
router.patch("/updatelist",authMiddleware,  updateCartList);
router.delete("/deletelist",authMiddleware,  deleteCartList);
router.get("/listbyuserid",authMiddleware,  getListByUserId);
router.get("/listbyusermail",authMiddleware,  getListByUserMailId);
router.put("/deleteproduct",authMiddleware,  deleteProduct);

module.exports = router;