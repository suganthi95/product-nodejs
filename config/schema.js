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
    //type: String,
    category:Array,
    minPrice:Number,
    maxPrice:Number
  },
  { timestamps: true }
);


const category =mongoose.model("category",categorySchema);
  
const userSchema= new Schema(
  {
   
    email: String,
    password: String,
    username: String,
    resetLink:{
       type :String,
      default:''
    }
  },{timestamps :true}
);

const user =mongoose.model("user",userSchema);


module.exports ={user, product ,category};
