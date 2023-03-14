const mongoose = require("mongoose");
//import {mongoose} from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017');

let userSchema =mongoose.Schema({
    fullName: String,
    mail_id: String,
    password: String,
  })         
  module.exports = mongoose.model("users",userSchema);

  let productSchema = mongoose.Schema({
    name:String,
    model:Number,
    side:String,
    colour:String,
    category:String,
    price: Number

  })
  module.exports= mongoose.model("Products",productSchema);
  