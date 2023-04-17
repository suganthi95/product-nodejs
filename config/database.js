const mongoose =require("mongoose");
 const uri ="mongodb+srv://keasnmacaa:keasnmacaa@cluster0.r4fp7bw.mongodb.net/ecom-app_db";

 const connectDb=()=>{
  return mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  });
 };
 


module.exports = connectDb;








// const { MongoClient } =require( "mongodb");



// const database = "ecom-app_db";
// const client = new MongoClient(url);

// async function connectDb(){
//     let result = await client.connect();
//       return  result.db(database);
//     };
// module.exports= connectDb;


