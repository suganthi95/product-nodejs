const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const Product = require("../config/schema.js");

const addProduct = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.create(req.body);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getProduct = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const findProduct = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.findOne({ _id: new ObjectId(req.body._id) });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const findProductById = async (req, res) => {
  try {
    await connectDb();
    let product = await Product.product.findOne({ _id: req.body._id });
    res.send(product);
    console.log(product);
  } catch (err) {
    res.send(err);
  }
};

const findProductByName = async (req, res) => {
  let products = await connectDb();
  let product = await products
    .collection("products")
    .find({ name: req.body.name })
    .toArray();
  res.send(product);
};

const getProductName = async (req, res) => {
  let products = await connectDb();
  let product = await products
    .collection("products")
    .find({}, { projection: { name: 1, _id: 0 } })
    .toArray();
  res.send(product);
};

const getProductNamePrice = async (req, res) => {
  let products = await connectDb();
  let product = await products
    .collection("products")
    .find({}, { projection: { name: 1, price: 1, _id: 0 } })
    .toArray();
  res.send(product);
};

const updateProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .updateOne(
      { _id: new ObjectId(req.body.product_id) },
      { $set: { price: req.body.price } }
    );
  res.send(result);
};

const deletePrtodut = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .deleteOne({ _id: new ObjectId(req.body.product_id) });
  res.send(`The product with the ID: ${req.body.product_id} is deleted`);
};

module.exports = {
  getProductNamePrice,
  getProductName,
  getProduct,
  findProduct,
  addProduct,
  updateProduct,
  deletePrtodut,
  findProductById,
  findProductByName,
};
