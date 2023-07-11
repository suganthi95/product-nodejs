const express = require("express");

const {
  getUsers,
  signUp,
  signIn,
  findUser,
  updateUser,
  deleteUser,
  findUdserById,
  findUserByName,
  findUserByMail,
  getUsersList,
  forgotPassword,
  resetPassword,
  token
} = require("../controllers/usercontroller.js");
const authMiddeleware = require("../helper/authMiddleware.js");
const router = express.Router();


router.get("",authMiddeleware, getUsers);
router.get("/find", findUser);

router.post("/register/user", signUp);
router.post("/signin", signIn);
router.post('/token', token)
router.put("/forgotpassword",forgotPassword)
router.put("/resetpassword",resetPassword)

router.put("/updateuser",authMiddeleware, updateUser);
router.delete("/deleteuser",authMiddeleware, deleteUser);

router.get("/findbyid",authMiddeleware, findUdserById);
router.get("/findbyname",authMiddeleware, findUserByName);

router.get("/findbymail",authMiddeleware, findUserByMail);
router.get("/userslist",authMiddeleware, getUsersList);

module.exports = router;
