const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const Category = require("../config/schema.js");

const createCategory = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.create(req.body);
    res.send(data);
    
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const getCategory =async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.find({});
    res.send(data);
    
  } catch (err) {
    res.send(err);

  }
};

const deleteCatById = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.findByIdAndDelete({_id:req.body._id});
    res.send(data);
    
  } catch (err) {
    res.send(err);

  }
};

const addProduct = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.findOneAndUpdate({_id:req.body._id},{$push:{products:req.body.products}});
    res.send(data);
    
  } catch (err) {
    res.send(err);

  }
};

const getCategoryId= async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.find({type:req.body.type});
    res.send(data);
    
  } catch (err) {
    res.send(err);
    

  }
};

const removeProduct = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.findOneAndUpdate
    ({_id:req.body._id},{products:{$pull:{_id:req.body._id}}});
    res.send(data);
    
  } catch (err) {
    res.send(err);

  }
};


module.exports = {createCategory,getCategory,deleteCatById,addProduct,getCategoryId,removeProduct}