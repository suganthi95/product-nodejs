const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productroutes.js");
const userRoute = require("./routes/userroutes.js");
const wishListRoute = require("./routes/wishListroutes.js");
const cartRoute = require("./routes/cartroutes.js");
const orderRoute = require("./routes/orderroutes.js");
const categoryRoute = require("./routes/categoryroutes.js");
const cookieParser = require("cookie-parser");
const PORT = 4000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require("mongoose");

// //configure mongoose

// const uri ="mongodb+srv://keasnmacaa:keasnmacaa@cluster0.r4fp7bw.mongodb.net/ecom-app_db";

// mongoose.connect(
//   uri,    //process.env.MONGODB_URI || mongodb://localhost/CRUD
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Connected to MongoDB");
//     }
//   }
// );





app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/wishlist", wishListRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/category", categoryRoute);
app.listen(PORT, () => console.log(`Listening the port :${PORT}`));
