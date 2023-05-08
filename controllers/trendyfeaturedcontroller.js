const connectDb = require("../config/database");
const Category = require("../config/schema.js");
const schedule = require('node-schedule');


const randomPro = async () => {
  await connectDb();
  const child = await Category.product.aggregate([
    {
      $match: {
        $or: [
          { category: "K-shirt" },
          { category: "K-Trendy" },
          { category: "K-Trousers" },
        ],
      },
    },
    {
      $sample: { size: 1 },
    },
  ]);

  const men = await Category.product.aggregate([
    {
      $match: {
        $or: [
          { category: "M-shirt" },
          { category: "M-Trendy" },
          { category: "M-Trousers" },
        ],
      },
    },
    {
      $sample: { size: 1 },
    },
  ]);

  const data = await Category.product.aggregate([
    {
      $match: {
        $or: [
          { category: "W-shirt" },
          { category: "W-Trendy" },
          { category: "W-kurtis" },
          { category: "W-saree" },
        ],
      },
    },

    { $sample: { size: 1 } },
  ]);
  const insertPro = await Category.trendyProduct.create({
    men: men[0],
    child: child[0],
    women: data[0],
    insertedAt: new Date(),
  }); 
 console.log(insertPro);
};

schedule.scheduleJob("*/10 * * * *", randomPro);



const randomData = async (req, res) => {
  try {
    await connectDb();
    const trend = await Category.trendyProduct.find({},{project:{_id:0}}).sort({insertedAt: -1}).limit(1);
    if (!trend) {
      res.send("No product in trending");
     
    } else {
      res.status(200).json(trend[0]);
    }
   } catch (err) {
    console.log(err);
    res.send(err);
  }
};


const featuredData = async (req, res) => {
  try {
    await connectDb();
    const trend = await Category.trendyProduct.find().sort({insertedAt:1}).limit(1);
    if (!trend) {
      res.send("No product in trending");
     
    } else {
      res.status(200).json(trend[0]);
    }
   } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { randomData, featuredData };
