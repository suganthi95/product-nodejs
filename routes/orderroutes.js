const express =require ("express");
const {getList,addOrder,listByUserId,updateOrderInfo,deleteOrderInfo} =  require("../controllers/ordercontroller.js")

const router = express.Router();

router.get("/orderlist",getList);
router.post("/addorder", addOrder);
router.get("/listbyuserid",listByUserId);
router.put("/updateorder",updateOrderInfo);
router.delete("/deleteorderinfo",deleteOrderInfo);

module.exports = router;