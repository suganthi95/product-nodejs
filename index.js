//server connection code here
const  express = require ("express");
const bodyParser = require("body-parser");
const  connectDb=require("./config/database.js");
const productRoute = require("./routes/productroutes.js");
const userRoute = require("./routes/userroutes.js");
const wishListRoute = require("./routes/wishListroutes.js");
const cartRoute = require("./routes/cartroutes.js");
const orderRoute = require("./routes/orderroutes.js");
const PORT = 4000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/products",productRoute);

app.use("/users", userRoute);
app.use("/wishlist",wishListRoute);
app.use("/cart",cartRoute);
app.use("/order",orderRoute);

app.listen(PORT,()=>console.log(`Listening the port :${PORT}`));

