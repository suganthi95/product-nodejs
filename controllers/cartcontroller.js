const express = require("express");
const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

const addUserToCart = async (req, res) => {
  const { user_id, products, user_email_id } = req.body;
  let data = await connectDb();
  let list = await data.collection("cart").insertOne({
    user_id: new ObjectId(user_id),
    user_email_id: user_email_id,
    products: products,
    createdAt: Date.now(),
  });
  res.send(list);
};

const addProductToCart = async (req, res) => {
  let db = await connectDb();
  let cart = await db
    .collection("cart")
    .findOneAndUpdate(
      { _id: new ObjectId(req.body.cart_id) },
      { $push: { products: req.body.products } }
    );
  res.send(cart);
};

const deleteCartList = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("cart")
    .deleteOne({ user_id: new ObjectId(req.body.user_id) });
  res.send(list);
};


const deleteProduct = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("cart")
    .findOneAndUpdate(
      { _id: new ObjectId(req.body.cart_id) },
      { $pull: { products: { _id: req.body.product_id } } }
    );
  res.send(`Product with ID:${req.body.product_id} deleted `);
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
  let data = await connectDb();
  let list = await data
    .collection("cart")
    .findOne({user_email_id:req.body.user_email_id});
  res.send(list);
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
