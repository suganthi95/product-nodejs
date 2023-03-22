const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const { v4: uuidv4 } = require("uuid");

const createList = async (req, res) => {
  const { product_id, user_id, user_email_id } = req.body;
  let data = await connectDb();
  let list = await data.collection("wishlist").insertOne({
    user_id: new ObjectId(user_id),
    products: [{ _id: uuidv4(), ...req.body.products }],
    user_email_id: user_email_id,
  });
  res.send(list);
};

const addProduct = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("wishlist")
    .findOneAndUpdate(
      { _id: new ObjectId(req.body.list_id) },
      { $push: { products: { _id: uuidv4(), ...req.body.products } } }
    );
  res.send(list);
};



const getList = async (req, res) => {
  let data = await connectDb();
  let list = await data.collection("wishlist").find().toArray();           //{ user_email_id: req.body.user_email_id },{ projection: { products: 1, _id: 0 } }
  res.send(list);
};

const listByUserId = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("wishlist")
    .find(
      { user_id: new ObjectId(req.body.user_id) },
      { projection: { products: 1, _id: 0 } }
    ).toArray();
  res.send(list);
};

const listByUserMail = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("wishlist")
    .find(
      { user_email_id: req.body.user_email_id },
      { projection: { products: 1, _id: 0 } }
    ).toArray();
  res.send(list);
};

const listByWhishListId = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("wishlist")
    .find(
      { _id: new ObjectId(req.body._id) },
      { projection: { products: 1, _id: 0 } }
    ).toArray();
  res.send(list);
};

const updateList = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("wishlist")
    .updateOne(
      { _id: new ObjectId(req.body.list_id) },
      { $set: { user_email_id: req.body.user_email_id } }
    );
  res.send(list);
};

const deleteList = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("wishlist")
    .deleteOne({ _id: new ObjectId(req.body._id) });
  res.send(result);
};

const deleteProduct = async (req, res) => {
  const query = { _id: new ObjectId(req.body.list_id) };
  let data = await connectDb();
  let result = await data
    .collection("wishlist")
    .findOneAndUpdate(
      { _id: new ObjectId(req.body.list_id) },
      { $pull: { products: { _id: req.body.product_id } } }
    );
  res.send(`The product with ID ${ req.body.product_id } deleted from wishlist`);
};

const getUserInfo = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("wishlist")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
    ])
    .toArray();
  res.send(result);
};

module.exports = {
  deleteProduct,
  createList,
  addProduct,
  getList,
  updateList,
  deleteList,
  getUserInfo,
  listByUserId,
  listByUserMail,
  listByWhishListId,
};
