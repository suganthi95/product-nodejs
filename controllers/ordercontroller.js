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
      status: req.body.status
    }
  ]);
  res.send(list);
};

const getCancelOrderList = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .find({status:"cancelled"},{projection:{products:1,status:1,_id:0}})
    .toArray();
  res.send(list);
};


const getRefundOrderList = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .find({status:"refunded"},{projection:{products:1,status:1,_id:0}})
    .toArray();
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

const cancelOrder = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .updateOne({ _id: new ObjectId(req.body.order_id)  },
    { $set: { status:"cancelled" } }); // or {$set:{status:req.body.status}}
  res.send(list);
};

const refundOrder = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .updateOne(
      { _id: new ObjectId(req.body.order_id) },
      { $set: { status: "refund" } } // or{$set:{status:req.body.status}}
    );
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
  getCancelOrderList,
  getRefundOrderList,
  listByUserId,
  refundOrder,
  cancelOrder_pro,
  cancelOrder,
};
