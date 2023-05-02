const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productroutes.js");
const userRoute = require("./routes/userroutes.js");
const wishListRoute = require("./routes/wishlistroutes.js");
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
const uri = process.env.DATABASE_URI
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`${uri}`);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }


app.use("/products", productRoute);
app.use("/wishlist", wishListRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/api", categoryRoute);

app.use("/api/users",userRoute)

//Connect to the database before listening
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("listening for requests");
//     })
// })




app.listen(PORT, () => console.log(`Listening the port :${PORT}`));
