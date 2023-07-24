const express =require ("express");
const {addProduct,
    deleteProduct,
    createList,
    getList,
    updateList,
    deleteList,
    getUserInfo,
    listByUserId,
    listByUserMail,
    listByWhishListId
    } = require ("../controllers/wishlistcontroller.js");
const authMiddleware= require("../helper/authMiddleware.js") 

const router = express.Router();

router.post("/addlist",authMiddleware, createList);
router.post("/product",authMiddleware,  addProduct);

router.get("/getlist",authMiddleware, getList);
router.patch("/updatelist",authMiddleware, updateList);

router.delete("/deletelist",authMiddleware, deleteList);
router.get("/getuserinfo",authMiddleware,  getUserInfo);

router.get("/listbyuserid",authMiddleware, listByUserId);
router.get("/listbyusermail",authMiddleware, listByUserMail);


router.get("/listbywishlistid",authMiddleware, listByWhishListId);
router.put("/deleteproduct",authMiddleware, deleteProduct);

module.exports=router;
