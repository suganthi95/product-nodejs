// user  routes code hereconst connectDb = require("../config/database.js");

const express = require("express");
const {
  getUsers,
  addUser,
  findUser,
  updateUser,
  deleteUser,
  findUdserById,
  findUserByName,
  findUserByMail,
  getUsersList
} = require("../controllers/usercontroller.js");
const router = express.Router();

router.get("", getUsers);

router.get("/find", findUser);

router.post("/adduser", addUser);

router.patch("/updateuser", updateUser);

router.delete("/deleteuser", deleteUser);

router.get("/findbyid",findUdserById);

router.get("/findbyname",findUserByName);

router.get("/findbymail",findUserByMail);

router.get("/userslist",getUsersList);

module.exports = router;
//export default router;
