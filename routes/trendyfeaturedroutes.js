const express = require("express");

const router = express.Router();

const {randomData, featuredData} = require("../controllers/trendyfeaturedcontroller.js")
//const authMiddleware = require("../config/authMiddleware.js")
const authMiddeleware = require("../helper/authMiddleware.js");


router.get("/product/trendy",randomData);
router.get("/product/featured",featuredData);

module.exports = router;
