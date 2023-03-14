const express = require("express");
const connectDb = require("../config/database.js");
const ObjectId =require ("mongodb").ObjectId;
const mongoose = require("mongoose");
//const Products= require("../config/schema.js");
// const productSchema= mongoose.Schema({
//   name:String,
//   model:Number,
//   side:String,
//   colour:String,
//   category:String,
//   price: Number

// })
// //module.exports= mongoose.model("products",productSchema);

const getProduct= async  (req, res)=> {
  let data = await connectDb();
  let result = await data.collection("products").find().toArray();
  res.send(result);
}

const findProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .find({ name: req.body.name })
    .toArray();
  res.send(result);
};

const addProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data.collection("products").insertOne(req.body);
  res.send(req.body);
};

const updateProduct = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .updateOne(
      { category: req.body.category },
      { $set: { price: req.body.price } }
    );
  res.send(result);
};

const deletePrtodut = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("products")
    .deleteOne({ proice: req.body.price });
  res.send(`The product with the cost: ${req.body.price} is deleted`);
};

const findProductById= async(req,res)=>{
  let products = await connectDb();
  let product = await products.collection("products").findOne({_id:new ObjectId(req.body._id)});
  res.send(product);
 console.log(product);
};

const findProductByName = async (req,res)=>{
  let products = await connectDb();
  let product = await products.collection("products").find({name:req.body.name}).toArray();
  res.send(product);
}

const getProductName =async(req,res)=>{
  let products = await connectDb();
  let product = await products.collection("products").find({},
    {projection:{name:1,_id:0  }}).toArray();
   
  res.send(product);
}; 
const getProductNamePrice =async(req,res)=>{
  let products = await connectDb();
  let product = await products.collection("products").find({},
    {projection:{name:1,price:1,_id:0  }}).toArray();
   
  res.send(product);
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
  findProductByName
};
