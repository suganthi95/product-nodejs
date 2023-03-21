const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;

const addUser = async (req, res) => {
  let data = await connectDb();
  let result = await data.collection("users").insertOne({
    fullName: req.body.name,
    mail_id: req.body.mail_id,
    password: req.body.password,
  });
  res.send(result);
};

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
  addUser,
  updateUser,
  deleteUser,
  findUserByMail,
  findUdserById,
  findUserByName,
  getUsersList,
};
/*app.post("/login", async (req, res) => {
  let data = await dbConnect();
 // let user=await data.collection("users").insertOne(req.body);//.toArray(););
 // console.log(user);
let findUser =await data.collection("users")
.find({mail_id:req.params.mail_id});//.toArray(); //(users)=>users.name === req.body.name
res.send(findUser);
  //res.send("you are logged in");
});*/
