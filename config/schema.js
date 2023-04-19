const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: String,
    price: Number,
    description: String,
    images: String,
  },
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
