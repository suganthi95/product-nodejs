// user info crud operation code here
const express = require("express");
const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;

const getUsers = async (req, res) => {
  let data = await connectDb();
  let result = await data.collection("users").find().toArray();
  res.send(result);
};

const findUser = async (req, res) => {
  let data = await connectDb();
  let result = await data.collection("users").findOne({ fullName: req.body.fullName});
  res.send(result);
};

const addUser = async (req, res) => {
  let data = await connectDb();
  let result = await data.collection("users").insertOne(req.body);
  res.send(result);
};

const updateUser = async (req, res) => {
  let data = await connectDb();
  let result = await data .collection("users") .updateOne(
      { fullName: req.body.fullName },
      { $set: { password: req.body.password } }
    );
  res.send(`User with ${req.body.fullName} is updated!`);
};

const deleteUser= async (req,res)=>{
  let data = await connectDb();
  let result = await data.collection("users").deleteOne({password:req.body.password});
    res.send(`User with ${req.body.password} is deleted`);
}

const findUdserById =async (req,res)=>{
  let data = await connectDb();
    let result = await data.collection("users").findOne({_id:new ObjectId(req.body._id)});
    res.send(result);
} ;

const findUserByMail = async (req,res)=>{
let data = await connectDb();
let users = await data.collection("users").findOne({mail_id:req.body.mail_id});
res.send(users);
console.log(users);
};

async function findUserByName(req, res) {
  let data = await connectDb();
  let users = await data.collection("users").find({fullName: req.body.fullName }).toArray();
  res.send(users);
  //console.log(users);
};

const getUsersList= async (req,res)=>{
  let data =await connectDb();
  let usersList =await data.collection("users").find({},{projection:{fullName:1,_id:0}}).toArray();
  res.send(usersList);
};
module.exports = {
  getUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser,
  findUserByMail,
  findUdserById,
  findUserByName,
  getUsersList
};
