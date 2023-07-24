const connectDb = require("../config/database");
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

const childCategory = async (req, res) => {
  try {
    await connectDb();
    const min = await Category.product
      .find({
        $or: [
          { category: { $eq: "K-shirt" } },
          { category: { $eq: "K-Trendy" } },
          { category: { $eq: "K-Trousers" } },
        ],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    //console.log(min[0].currPrice);

    const max = await Category.product
      .find({
        $or: [
          { category: { $eq: "K-shirt" } },
          { category: { $eq: "K-Trendy" } },
          { category: { $eq: "K-Trousers" } },
        ],
      })
      .sort({ currPrice: -1 })
      .limit(1);

    const data = {
      category: ["shirts", "trousers", "trendy"], //[shirts[0].category, trousers[0].category, trendy[0].category],
      minPrice: min[0].currPrice,
      maxPrice: max[0].currPrice,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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
    const data = await Category.product.find({
      $or: [
        { category: { $eq: "W-shirt" } },
        { category: { $eq: "W-Trendy" } },
        { category: { $eq: "W-kurtis" } },
        { category: { $eq: "W-saree" } },
      ],
    });
    //console.log(child);
    const result = await Category.category.insertMany({
      type: "women",
      products: data,
    });

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};





const limitChildProPrice = async (req, res) => {
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

const getMenPro = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({
      $or: [
        { category: { $eq: "M-shirt" } },
        { category: { $eq: "M-Trendy" } },
        { category: { $eq: "M-Trousers" } },
      ],
    });
    //res.send({products:result});
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMenTrend = async (req, res) => {
  try {
    await connectDb();
    const trendy = await Category.product.find({ category: "M-Trendy" });
    res.send(trendy);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};

const getMenShirt = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({ category: "M-shirt" });
    res.send(result);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};

const getMenTrouser = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({ category: "M-Trousers" });
    res.send(result);
    // res.send({Trousers:result})
  } catch (err) {
    res.send(err);
  }
};

const getMenMax = async (req, res) => {
  try {
    await connectDb();
    const maxPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "M-shirt" } },
          { category: { $eq: "M-Trendy" } },
          { category: { $eq: "M-Trousers" } },
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

const getMenMin = async (req, res) => {
  try {
    await connectDb();
    const minPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "M-shirt" } },
          { category: { $eq: "M-Trendy" } },
          { category: { $eq: "M-Trousers" } },
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

const menCategory = async (req, res) => {
  try {
    await connectDb();
    const min = await Category.product
      .find({
        $or: [
          { category: { $eq: "M-shirt" } },
          { category: { $eq: "M-Trendy" } },
          { category: { $eq: "M-Trousers" } },
        ],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    //console.log(min[0].currPrice);

    const max = await Category.product
      .find({
        $or: [
          { category: { $eq: "M-shirt" } },
          { category: { $eq: "M-Trendy" } },
          { category: { $eq: "M-Trousers" } },
        ],
      })
      .sort({ currPrice: -1 })
      .limit(1);

    const data = {
      category: ["shirts", "trousers", "trendy"], //[shirts[0].category, trousers[0].category, trendy[0].category],
      minPrice: min[0].currPrice,
      maxPrice: max[0].currPrice,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const limitMenProPrice = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $and: [
          {
            $or: [
              { category: "M-shirt" },
              { category: "M-Trousers" },
              { category: "M-Trendy" },
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

const getWoPro = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({
      $or: [
        { category: { $eq: "W-shirt" } },
        { category: { $eq: "W-Trendy" } },
        { category: { $eq: "W-kurtis" } },
        { category: { $eq: "W-saree" } },
      ],
    });
    //res.send({products:result});
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const woCategory = async (req, res) => {
  try {
    await connectDb();
    const min = await Category.product
      .find({
        $or: [
          { category: { $eq: "W-shirt" } },
          { category: { $eq: "W-Trendy" } },
          { category: { $eq: "W-kurtis" } },
          { category: { $eq: "W-saree" } },
        ],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    //console.log(min[0].currPrice);

    const max = await Category.product
      .find({
        $or: [
          { category: { $eq: "W-shirt" } },
          { category: { $eq: "W-Trendy" } },
          { category: { $eq: "W-kurtis" } },
          { category: { $eq: "W-saree" } },
        ],
      })
      .sort({ currPrice: -1 })
      .limit(1);

    const data = {
      category: ["shirts", "kurtis", "trendy", "sarees"], //[shirts[0].category, trousers[0].category, trendy[0].category],
      minPrice: min[0].currPrice,
      maxPrice: max[0].currPrice,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getWoTrend = async (req, res) => {
  try {
    await connectDb();
    const trendy = await Category.product.find({ category: "W-Trendy" });
    res.send(trendy);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};
const getWoSaree = async (req, res) => {
  try {
    await connectDb();
    const trendy = await Category.product.find({ category: "W-saree" });
    res.send(trendy);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};
const getWoKurti = async (req, res) => {
  try {
    await connectDb();
    const trendy = await Category.product.find({ category: "W-kurtis" });
    res.send(trendy);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};

const getWoShirt = async (req, res) => {
  try {
    await connectDb();
    const result = await Category.product.find({ category: "W-shirt" });
    res.send(result);
    // res.send({Trendy:trendy})
  } catch (err) {
    res.send(err);
  }
};

const getWoMax = async (req, res) => {
  try {
    await connectDb();
    const maxPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "W-shirt" } },
          { category: { $eq: "W-Trendy" } },
          { category: { $eq: "W-kurtis" } },
          { category: { $eq: "W-saree" } },
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

const getWoMin = async (req, res) => {
  try {
    await connectDb();
    const minPrice = await Category.product
      .find({
        $or: [
          { category: { $eq: "W-shirt" } },
          { category: { $eq: "W-Trendy" } },
          { category: { $eq: "W-kurtis" } },
          { category: { $eq: "W-saree" } },
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



const limitWoProPrice = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $and: [
          {
            $or: [
              { category: "W-shirt" },
              { category: "W-kurtis" },
              { category: "W-Trendy" },
              { category: "W-saree" },
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

const getWoBags = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({ category: "W-Bags" });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMenBags = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({ category: "M-Bags" });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getAllBags = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({
      $or: [{ category: "W-Bags" }, { category: "M-Bags" }],
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getBagFilterByPrice = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({
      $and: [
        { $or: [{ category: "W-Bags" }, { category: "M-Bags" }] },
        { currPrice: { $lte: req.body.price } },
      ],
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMaxPriceBag = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $or: [{ category: "W-Bags" }, { category: "M-Bags" }],
      })
      .sort({ currPrice: -1 })
      .limit(1);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMinPriceBag = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $or: [{ category: "W-Bags" }, { category: "M-Bags" }],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const bagCategory = async (req, res) => {
  try {
    await connectDb();
    const min = await Category.product
      .find({
        $or: [{ category: "W-Bags" }, { category: "M-Bags" }],
      })
      .sort({ currPrice: 1 })
      .limit(1);

    const max = await Category.product
      .find({
        $or: [{ category: "W-Bags" }, { category: "M-Bags" }],
      })
      .sort({ currPrice: -1 })
      .limit(1);

    const data = {
      category: ["men", "women"],
      minPrice: min[0].currPrice,
      maxPrice: max[0].currPrice,
    };
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

const getWoWatch = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({ category: "W-watch" });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMenWatch = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({ category: "M-watch" });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getAllWatch = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({
      $or: [{ category: "W-watch" }, { category: "M-watch" }],
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getWatchFilterByPrice = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product.find({
      $and: [
        { $or: [{ category: "W-watch" }, { category: "M-watch" }] },
        { currPrice: { $lte: req.body.price } },
      ],
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMaxPriceWatch = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $or: [{ category: "W-watch" }, { category: "M-watch" }],
      })
      .sort({ currPrice: -1 })
      .limit(1);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getMinPriceWatch = async (req, res) => {
  try {
    await connectDb();

    let result = await Category.product
      .find({
        $or: [{ category: "W-watch" }, { category: "M-watch" }],
      })
      .sort({ currPrice: 1 })
      .limit(1);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const watchCategory = async (req, res) => {
  try {
    await connectDb();
    const min = await Category.product
      .find({
        $or: [{ category: "W-watch" }, { category: "M-watch" }],
      })
      .sort({ currPrice: 1 })
      .limit(1);

    const max = await Category.product
      .find({
        $or: [{ category: "W-watch" }, { category: "M-watch" }],
      })
      .sort({ currPrice: -1 })
      .limit(1);

    const data = {
      category: ["men", "women"],
      minPrice: min[0].currPrice,
      maxPrice: max[0].currPrice,
    };
    res.send(data);
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




  
  
   
 
// const randomData = async (req,res)=>{
//   try{
//   await connectDb();
//   let cachedDocId = null;
//   async ()=>{ 
//   let doc = null;
    
//     if (cachedDocId) {
//       doc = await getDocById(cachedDocId);
//     }
  
//     if (!doc) {
//       doc = await getRandomDoc();
//       cachedDocId = doc._id;
//     }
//   console.log(doc);
//     res.send(doc);
  
  
//   setInterval(getRandomDoc, 10000);}
// }catch(err){
//   console.log(err);
// }
// };
  
//   async function getRandomDoc() {
//     let pipeline = [{$sample: {size: 1}}];
//     let doc  = await Category.product.aggregate(pipeline);
    
//     if (doc) {
//       //console.log(doc);
//       return doc;
//     } else {
//       console.log('No documents found.');
//       return null;
//     }
//   }
  
//   async function getDocById(id) {
//     let doc = await Category.product.findOne({_id: id});
  
//     if (doc) {
//       //console.log(doc);
//       return doc;
//     } else {
//       console.log(`No document found with ID: ${id}`);
//       return null;
//     }
//   }
 


  // client.connect((err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     collection = client.db("test").collection("myCollection");
       // call every 10 minutes
      //app.listen(port, () => console.log(`Example app listening on port ${port}!`));
   // }
//}
//)
//}


module.exports = {
 // randomData,
  getChildrenPro,
  getChildTrend,
  getChildShirt,
  getChildTrouser,
  getChildMax,
  getChildMin,
  limitChildProPrice,
  childCategory,
 

  getMenPro,
  getMenTrend,
  getMenShirt,
  getMenTrouser,
  getMenMax,
  getMenMin,
  limitMenProPrice,
  menCategory,

  getWoPro,
  getWoTrend,
  getWoShirt,
  getWoKurti,
  getWoSaree,
  getWoMax,
  getWoMin,
  limitWoProPrice,
  woCategory,

  getCategory,
  deleteCatById,
  addProduct,
  getCategoryId,
  removeProduct,
  createSubCategory,
  createChildCat,

  getAllBags,
  getWoBags,
  getMenBags,
  getBagFilterByPrice,
  getMaxPriceBag,
  getMinPriceBag,
  bagCategory,

  getAllWatch,
  getWoWatch,
  getMenWatch,
  getWatchFilterByPrice,
  getMaxPriceWatch,
  getMinPriceWatch,
  watchCategory,
};
