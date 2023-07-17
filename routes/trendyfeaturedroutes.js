const express = require("express");

const router = express.Router();

const {randomData, featuredData} = require("../controllers/trendyfeaturedcontroller.js")
//const authMiddleware = require("../config/authMiddleware.js")
const authMiddeleware = require("../helper/authMiddleware.js");
var cors = require('cors');
 
var corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get("/product/trendy",cors(corsOptions),randomData);
router.get("/product/featured",cors(corsOptions),featuredData);

module.exports = router;