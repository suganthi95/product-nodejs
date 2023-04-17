const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const Category = require("../config/schema.js");

const createCategory = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.create(req.body);
    res.send(data);
    
  } catch (err) {
    res.send(err);
  }
};


module.exports = {createCategory};