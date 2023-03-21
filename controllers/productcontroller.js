const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;

const addProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
  .collection("products").insertOne({
    name:req.body.name,
    model:req.body.model,
    size:req.body.size,
    colour:req.body.colour,
    category:req.body.category,
    price:req.body.price
});
  res.send(result);
};

const findProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .find({ name: req.body.name })
    .toArray();
  res.send(result);
};

const findProductById = async (req, res) => {
  let products = await connectDb();
  let product = await products
    .collection("products")
    .findOne({ _id: new ObjectId(req.body._id) });
  res.send(product);
  console.log(product);
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
 res.send(product);};

 const getProductNamePrice = async (req, res) => {
  let products = await connectDb();
  let product = await products
    .collection("products")
    .find({}, { projection: { name: 1, price: 1, _id: 0 } }).toArray();
res.send(product)
};

const getProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
  .collection("products").find().toArray();
  res.send(result);
};


const updateProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .updateOne(
      { _id:new ObjectId( req.body.product_id)},
      { $set: { price: req.body.price } }
    );
  res.send(result);
};

const deletePrtodut = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .deleteOne({ _id:new ObjectId( req.body.product_id)});
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
