const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const Order = require("../config/schema.js")

const getList = async (req, res) => {
  const data = await connectDb();
  const list = await data
    .collection("orders")
    .find({}, { projection: { products: 1, user_id: 1, price: 1, _id: 0 } })
    .toArray();
  res.send(list);
};



const addOrder = async (req, res) => {
  try{
  await connectDb();


  let array = req.body.map((key)=>[
    key.user_email_id,
    key.product_id,
    key.product_title,
    key.price,
    key.quantity

  ]);
  console.log(array);
  for(let i=0; i<array.length;i++){
    let email_id = array[i][0];
    let id = array[i][1];
    let title=array[i][2];
    let price= array[i][3];
    let quantity = array[i][4];

console.log(quantity);
 await Order.order.insertMany([
    {
      user_email_id:email_id,
      product_id:id,
      product_title:title,
      price: price,
      quantity:quantity,
      status: "Ordered"
    }]
  );

  }
  res.status(200).json("order placed successfully....!");
}catch(error){
  res.status(400).json(error)
}
};

const getCancelOrderList = async (req, res) => {
  try{
   await connectDb();
  const list = await Order.order.findOne({status:"cancelled"},{projection:{products:1,status:1,_id:0}});
  res.status(200).json(list);
  }catch(error){
    res.status(400).json(error)
  }
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
  try{
  await connectDb();
  const list = await Order.order.findOneAndUpdate({ _id: new ObjectId(req.body.order_id)  },
    { $set: { status:"cancelled" } }); // or {$set:{status:req.body.status}}
  res.status(200).json(list);
  }catch(error){
    res.status(400).json(error)
  }
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
