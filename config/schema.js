const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: String,
    description: String,
    images: String,
    image2:String,
    category:String,
    isNew:{
      type:Boolean,
      default:true
    },
    oldPrice:Number, 
    currPrice:Number,
    
  },
  { suppressReservedKeysWarning: true },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

const categorySchema = new Schema(
  {
    type: String,
    products:Array,
  },
  { timestamps: true }
);
const category =mongoose.model("category",categorySchema);


const trendySchema = new Schema(
  {
    men:Array,
    women:Array,
    child:Array,
    insertedAt: {
      type:Date,
      expires:'30m'
  }
}
);

const trendyProduct =mongoose.model("trendyProduct",trendySchema);


  
const userSchema= new Schema(
  {
   
    email: String,
    password: String,
    username: String,
    refreshtoken:String
    
  },{timestamps :true}
);

const user =mongoose.model("user",userSchema);


module.exports ={user, product ,category,trendyProduct};
