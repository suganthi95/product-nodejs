const express = require("express");
const {
  getList,
  addOrder,
  getCancelOrderList,
  getRefundOrderList,
  listByUserId,
  refundOrder,
  cancelOrder,
  cancelOrder_pro,
} = require("../controllers/ordercontroller.js");
const authMiddleware = require("../helper/authMiddleware.js") ;

const router = express.Router();

router.get("/orderlist",authMiddleware,  getList);

router.post("/addorder",authMiddleware,  addOrder);

router.get("/listbyuserid",authMiddleware,  listByUserId);
router.get("/cancelledorder",authMiddleware,  getCancelOrderList);
router.get("/refundorder",authMiddleware,  getRefundOrderList);

router.put("/refundorder",authMiddleware,  refundOrder);

router.put("/cancelorder",authMiddleware,  cancelOrder);
router.put("/cancelorder_pro",authMiddleware,  cancelOrder_pro);

module.exports = router;
