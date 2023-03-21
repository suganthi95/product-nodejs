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
const router = express.Router();

router.post("/addlist",createList);
router.post("/product", addProduct);

router.get("/getlist",getList);
router.patch("/updatelist",updateList);

router.delete("/deletelist",deleteList);
router.get("/getuserinfo", getUserInfo);

router.get("/listbyuserid",listByUserId);
router.get("/listbyusermail",listByUserMail);


router.get("/listbywishlistid",listByWhishListId);
router.put("/deleteproduct",deleteProduct);

module.exports=router;