// wishlist crud operation code here
const express = require("express");
const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
//const Wishlist=require("../cofig/schema.js");
const createList = async (req, res) => {
    const { _id, products } = req.body;
    let data = await connectDb();
    let list = await data.collection("wishlist").insertOne({
      _id: new ObjectId(_id),
      products: products
     // user_email_id: user_email_id,
    });
    res.send(list);
    console.log(list);
  };


  const addProductList =async (req,res)=>{
    let data = await connectDb();
    let list = await data.collection("wishlist").
    insertOne({_id:new ObjectId(req.body._id)},{products: req.body.products});
    res.send(list);

  };
const getList = async (req, res) => {
    let data = await connectDb();
    let list = await data.collection("wishlist").find().toArray(); //{ user_email_id: req.body.user_email_id },{ projection: { products: 1, _id: 0 } }
    res.send(list);
};

const updateList = async (req, res) => {
  let data = await connectDb();
  let list = await data
    .collection("wishlist")
    .updateMany(
      { _id: new ObjectId(req.body._id) },
      { $set: { products: req.body.products } }
    );
  res.send(list);
};

const deleteList = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("wishlist")
    .deleteOne({ _id: new ObjectId(req.body._id) });
  res.send(result);
};

const getUserInfo = async (req, res) => {
  let data = await connectDb();
  let result =await data.collection("wishlist").aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "userInfo",
      },
    },
  ]).toArray();
  res.send(result);
};

const listByUserId = async (req, res) => {
    let data = await connectDb();
    let list = await data.collection("wishlist").find({user_id:new ObjectId(req.body.user_id)},{projection:{products:1,_id:0}}).toArray(); 
    res.send(list);}

    const listByUserMail = async (req, res) => {
        let data = await connectDb();
        let list = await data.collection("wishlist").find({user_email_id:req.body.user_email_id},{projection:{products:1,_id:0}}).toArray(); 
        res.send(list);
    };

    const listByWhishListId = async (req, res) => {
        let data = await connectDb();
        let list = await data.collection("wishlist").find({_id:new ObjectId(req.body._id)},{projection:{products:1,_id:0}}).toArray(); 
        res.send(list);}

    module.exports = {createList, addProductList, getList, updateList, deleteList, getUserInfo,listByUserId,listByUserMail,listByWhishListId };
