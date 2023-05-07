const express = require("express");
const Category = require("./config/schema.js");
const schedule = require("node-schedule");

const bodyParser = require("body-parser");
const productRoute = require("./routes/productroutes.js");
const userRoute = require("./routes/userroutes.js");
const wishListRoute = require("./routes/wishlistroutes.js");
const cartRoute = require("./routes/cartroutes.js");
const orderRoute = require("./routes/orderroutes.js");
const categoryRoute = require("./routes/categoryroutes.js");
const trendyRoute = require("./routes/trendyfeaturedroutes.js")
const cookieParser = require("cookie-parser");

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/products", productRoute);
app.use("/wishlist", wishListRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/api", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/new", trendyRoute);

//Connect to the database before listening
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("listening for requests");
//     })
// }
app.listen(PORT, () => console.log(`Listening the port :${PORT}`));
