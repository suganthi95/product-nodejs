// cart routes code here
const express =require ("express");
const {deleteProduct,getListByUserId,addProductToCart,addUserToCart,getCartList, updateCartList,deleteCartList} = require ("../controllers/cartcontroller.js");
const router = express.Router();

router.post("/addusertocart", addUserToCart);
router.post("/addproduct",addProductToCart);
router.get("/getlist",getCartList); 

router.patch("/updatelist",updateCartList);
router.delete("/deletelist",deleteCartList);
router.get("/listbyuserid",getListByUserId);
router.put("/deleteproduct",deleteProduct)


module.exports= router;