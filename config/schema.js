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
    products: Array
  },
  { timestamps: true }
);

const category =mongoose.model("category",categorySchema);
module.exports ={ product ,category};
