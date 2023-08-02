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

router.post("/addusertocart",   addUserToCart);
router.post("/addproduct",  addProductToCart);
router.get("/getlist",  getCartList);
router.patch("/updatelist",  updateCartList);
router.delete("/deletelist", deleteCartList);
router.get("/listbyuserid",  getListByUserId);
router.get("/listbyusermail/:user_email_id",  getListByUserMailId);
router.put("/deleteproduct",deleteProduct);

module.exports = router;