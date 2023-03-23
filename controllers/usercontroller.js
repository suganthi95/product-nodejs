const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const { hashValidator, hashGenerate } = require("../config/hash.js");
const  tokenGenerator= require("../config/token.js");

const signUp= async (req, res) => {
  try {
    const hashedPassword = await hashGenerate(req.body.password);
    let data = await connectDb();
    let result = await data.collection("users").insertOne({
      fullName: req.body.name,
      mail_id: req.body.mail_id,
      password: hashedPassword,
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const signIn = async (req, res) => {
  try {
    const data = await connectDb();
    const existingUser = await data
      .collection("users")
      .findOne({ mail_id: req.body.mail_id });
    if (!existingUser) {
      res.send("invalid mail_id");
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (!checkUser) {
        res.send("invalid password");
      } else {
        const token = await tokenGenerator(existingUser.mail_id);
       // res.cookie("jwt", token,{httpOnly:true});
        res.send(token);
      }
    }
  } catch (err) {
    res.send(err);
  
  }
};

/*const authVerify = async (req, res, next) => {
  try {
    const{ jwt } =  req.cookies;
    const valid = await tokenValidator(jwt);
    if (valid) {
      next();
    } else {
      res.send("Access Denied");
    }
  } catch (err) {
    res.send(err);
  }
};*/

const findUdserById = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .findOne({ _id: new ObjectId(req.body.user_id) });
  res.send(result);
};

const findUserByMail = async (req, res) => {
  let data = await connectDb();
  let users = await data
    .collection("users")
    .findOne({ mail_id: req.body.mail_id });
  res.send(users);
};

const findUser = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .findOne({ fullName: req.body.fullName });
  res.send(result);
};

const getUsers = async (req, res) => {
  let data = await connectDb();
  let result = await data.collection("users").find().toArray();
  res.send(result);
};

const getUsersList = async (req, res) => {
  let data = await connectDb();
  let usersList = await data
    .collection("users")
    .find({}, { projection: { fullName: 1, _id: 0 } })
    .toArray();
  res.send(usersList);
};

const updateUser = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .updateOne(
      { _id: req.body.user_id },
      { $set: { password: req.body.password } }
    );
  res.send(`User with ${req.body.user_id} is updated!`);
};

const deleteUser = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .deleteOne({ _id: req.body.user_id });
  res.send(`User with ${req.body.user_id} is deleted`);
};

const findUserByName = async (req, res) => {
  let data = await connectDb();
  let users = await data
    .collection("users")
    .find({ fullName: req.body.fullName })
    .toArray();
  res.send(users);
  //console.log(users);
};

module.exports = {
  getUsers,
  findUser,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  findUserByMail,
  findUdserById,
  findUserByName,
  getUsersList,
};
