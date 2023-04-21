const connectDb = require("../config/database.js");
const ObjectId = require("mongodb").ObjectId;
const Category = require("../config/schema.js");

const getChildrenPro = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({
      $or: [
        { category: { $eq: "K-shirt" } },
        { category: { $eq: "K-Trendy" } },
        { category: { $eq: "K-Trousers" } },
      ],
    });
    //res.send({products:result});
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getChildTrend = async (req, res) => {
  try {
    await connectDb();
    const trendy = await Category.product.find({ category: "K-Trendy" });
    res.send(trendy);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};

const getChildShirt = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({ category: "K-shirt" });
    res.send(result);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};

const getChildTrouser = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({ category: "K-Trousers" });
    res.send(result);
    // res.send({Trousers:result})
  } catch (err) {
    res.send(err);
  }
};

const getChildMax = async (req, res) => {
  try {
    await connectDb();
    const maxPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "K-shirt" } },
          { category: { $eq: "K-Trendy" } },
          { category: { $eq: "K-Trousers" } },
        ],
      })
      .sort({ currPrice: -1 })
      .limit(1);
    res.send(maxPrice);
    // res.send({Trousers:result})
  } catch (err) {
    res.send(err);
  }
};

const getChildMin = async (req, res) => {
  try {
    await connectDb();
    const minPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "K-shirt" } },
          { category: { $eq: "K-Trendy" } },
          { category: { $eq: "K-Trousers" } },
        ],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    res.send(minPrice);
    // res.send({MinPrice:minPrice})
  } catch (err) {
    res.send(err);
  }
};

const createChildCat = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({
      $or: [
        { category: { $eq: "K-shirt" } },
        { category: { $eq: "K-Trendy" } },
        { category: { $eq: "K-Trousers" } },
      ],
    });

    const minPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "K-shirt" } },
          { category: { $eq: "K-Trendy" } },
          { category: { $eq: "K-Trousers" } },
        ],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    const shirt = await Category.product.find({ category: "K-shirt" });
    const trousers = await Category.product.find({ category: "K-Trousers" });
    const trendy = await Category.product.find({ category: "K-Trendy" });

    res.status(201).send([
      {
        category: [
          { shirts: shirt },
          { Trousers: trousers },
          { Trendy: trendy },
        ],
      },
      { maxPrice: maxPrice },
      { miniPrice: minPrice },
    ]);
  } catch (err) {
    res.send(err);
  }
};

const limitProPrice = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $and: [
          {
            $or: [
              { category: "K-shirt" },
              { category: "K-Trousers" },
              { category: "K-Trendy" },
            ],
          },
          { currPrice: { $lte: req.body.price } },
        ],
      })
      .sort({ price: 1 });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};


const createSubCategory = async (req, res) => {
  try {
    await connectDb();
    const shirt = [];
    const products = await Category.category.find(
      { type: "children" },
      { _id: 0, products: 1 }
    );
    const data = products.forEach((product) => {
      if (product.category == "shirt") {
        shirt = shirt.push(product);
      }
    });
    res.send(shirt);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.find({ type: "shirt" && "" }); //req.params.type
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

const deleteCatById = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.findByIdAndDelete({
      _id: req.body._id,
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

const addProduct = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { products: req.body.products } }
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

const getCategoryId = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.find({ type: req.body.type });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

const removeProduct = async (req, res) => {
  try {
    await connectDb();
    const data = await Category.category.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { products: { _id: req.body.product_id } } }
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getChildrenPro,
  getChildTrend,
  getChildShirt,
  getChildTrouser,
  getChildMax,
  getChildMin,
  getCategory,
  deleteCatById,
  addProduct,
  getCategoryId,
  removeProduct,
  createSubCategory,
  createChildCat,
  limitProPrice,
};
