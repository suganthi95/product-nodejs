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

// const findProduct = async (req, res) => {
//   try {
//     await connectDb();
//     let result = await Product.product.findOne({ _id: new ObjectId(req.body._id) });
//     res.send(result);
//   } catch (err) {
//     res.send(err);
//   }
// };

const findProductById = async (req, res) => {
  try {
    await connectDb();
    let product = await Product.product.findOne({ _id: req.body._id });
    res.send(product);
  } catch (err) {
    res.send(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: { category: req.body.category } }
    );
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const deletePrtodut = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.findByIdAndDelete({ _id: req.body._id });
    res.send(`The product with the ID: ${req.body._id} is deleted`);
  } catch (err) {
    res.send(err);
  }
};

const highToLowPrice = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.find({}).sort({ price: -1 });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const proByCat =  async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.find({category:req.body.category})
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};


const lowToHighPrice = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.find({}).sort({ price: 1 });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const minPricePro = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product.find().sort({ price: -1 }).limit(1);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const limitProPrice = async (req, res) => {
  try {
    await connectDb();
    let result = await Product.product
      .find({ price: { $lte: req.body.price } })
      .sort({ price: 1 });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};


const getRandomData = async (req,res)=>{
 try{
  // await connectDb();
 setInterval(myTimer, 3000);

 async function myTimer() {
  await connectDb();
  const product = await Product.product.aggregate([
    {
      $sample: {size:1}
  }
]);
   console.log(product);

    res.send( product);
  
  } 
}catch(err){
  res.send(err)
}
}


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
  await connectDb();
  let result = await Product.product.find({}, { project: { _ } });
  res.send(result);
};

module.exports = {
  getProductNamePrice,
  getProductName,
  getProduct,
  //findProduct,
  addProduct,
  updateProduct,
  deletePrtodut,
  findProductById,
  findProductByName,
  lowToHighPrice,
  highToLowPrice,
  minPricePro,
  limitProPrice,
  proByCat,
  getRandomData
};
