const express = require("express");
const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const Product = require("../config/schema.js");

// const addUserToCart = async (req, res) => {
//   const { user_id, products, user_email_id } = req.body;
//   let data = await connectDb();
//   let list = await data.collection("cart").insertOne({
//     user_id: new ObjectId(user_id),
//     user_email_id: user_email_id,
//     products: products,
//     createdAt: Date.now(),
//   });
//   res.send(list);
// };

const addUserToCart= async (req, res) => {
  try {
    await connectDb();
    let result = await Product.cart.create(req.body);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const addProductToCart = async (req, res) => {
  try{ await connectDb();
  let cart = await Product.cart.findOneAndUpdate(
      { _id: new ObjectId(req.body.cart_id) },
      { $push: { products: req.body.products } }
    );
  res.send(cart);
    }catch(err){
      res.send(err);
    }
};

const deleteCartList = async (req, res) => {
  try{
  await connectDb();
  let list = await Product.cart.findOneAndDelete({ _id: new ObjectId(req.body.cart_id) });
  res.send(list);

  }catch(err){
    res.send(err);
  }
};


const deleteProduct = async (req, res) => {
  try{   await connectDb();
   await Product.cart.findOneAndDelete(
      { products: { _id: req.body.product_id } } 
    );
  res.send(`Product with ID:${req.body.product_id} deleted `);
    }catch(err){
      res.send(err);
    }
    };


const updateCartList = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("cart")
    .updateMany(
      { user_id: new ObjectId(req.body.user_id) },
      { $set: { products: req.body.products } }
    );
  res.send(list);
};

const getCartList = async (req, res) => {
  let data = await connectDb();
  let list = await data.collection("cart").find().toArray();
  res.send(list);
};

const getListByUserId = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("cart")
    .findOne({ user_id: new ObjectId(req.body.user_id) },{projection:{products:1,_id:0}}); 
  res.send(list);
};

const getListByUserMailId = async (req, res) => {
  try{
    const email = req.params.user_email_id;
   await connectDb();
    let list = await Product.cart.find({user_email_id:email});
        let reArray =[];
        list.forEach(obj =>{
          reArray.push(obj.products[0]);
        });
            console.log(reArray);
        res.status(200).json(reArray);
  }catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};



module.exports = {
  addProductToCart,
  addUserToCart,
  getCartList,
  updateCartList,
  deleteCartList,
  getListByUserId,
  getListByUserMailId,
  deleteProduct,
};
