const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;

const getList = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .find({}, { projection: { products: 1, user_id: 1, price: 1, _id: 0 } })
    .toArray();
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
};

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

const cancelOrder = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .deleteOne({ _id: new ObjectId(req.body.order_id) });
  res.send(list);
};

const cancelOrder_pro = async (req, res) => {
  const data = await (await connectDb()).collection("orders");
  const cancelOdr = await data.findOneAndUpdate(
    { _id: new ObjectId(req.body.order_id) },
    { $pull: { products: { product_id: req.body.product_id } } }
  );
  res.send({message:"order cancelled amount will be refund"});
};

module.exports = {
  getList,
  addOrder,
  listByUserId,
  updateOrderInfo,
  cancelOrder_pro,
  cancelOrder,
};
