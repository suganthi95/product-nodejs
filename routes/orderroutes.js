const express = require("express");
const {
  getList,
  addOrder,
  listByUserId,
  updateOrderInfo,
  cancelOrder,
  cancelOrder_pro,
} = require("../controllers/ordercontroller.js");

const router = express.Router();

router.get("/orderlist", getList);

router.post("/addorder", addOrder);

router.get("/listbyuserid", listByUserId);

router.put("/updateorder", updateOrderInfo);

router.delete("/cancelorder", cancelOrder);
router.put("/cancelorder_pro", cancelOrder_pro);

module.exports = router;
