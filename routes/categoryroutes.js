const express = require("express");
const {createCategory}= 
 require("../controllers/categorycontroller.js");
//const authMiddleware = require("../config/authMiddleware.js")
const router = express.Router();

router.post("/addcategory",createCategory);

module.exports = router;