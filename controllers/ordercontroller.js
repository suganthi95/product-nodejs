const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;

const getList = async (req, res) => {
  const data = await connectDb();
  const list = await data.collection("orders").find({},{projection:{products :1,user_id:1,price:1,_id:0}}).toArray();
  res.send(list);
};

const addOrder = async (req, res) => {
  let data = await connectDb();
  const list = await data.collection("orders").insertMany([
    {
      user_id: new ObjectId(req.body.user_id),
      products: req.body.products,
      subtotal: req.body.subtotal,
      totalamt: req.body.amount,
      address: req.body.address,
      orderdAt: new Date(),
    },
  ]);
  res.send(list);
  console.log(list);
}; //{user_id:new ObjectId(req.body.user_id)},{projection:{product_id:1,price:1,quantity:1,_id:0}}

const listByUserId = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .find(
      { user_id: new ObjectId(req.body.user_id) }, //list by order_id ## find({_id:new ObjectId(req.body.order_id)})
      { projection: { products: 1, orderdAt: 1, _id: 0 } }
    )
    .toArray();
  res.send(list);
};

const updateOrderInfo = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .updateOne(
      { _id: new ObjectId(req.body.order_id) },
      { $set: { address: req.body.address } }
    );
  res.send(list);
};

const deleteOrderInfo = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .deleteOne({ _id: new ObjectId(req.body.order_id) });
  res.send(list);
};

module.exports = {
  getList,
  addOrder,
  listByUserId,
  updateOrderInfo,
  deleteOrderInfo,
};
