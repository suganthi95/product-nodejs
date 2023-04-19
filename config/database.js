const mongoose =require("mongoose");
require("dotenv").config();


const uri =process.env.MONGODB_URI;

 
const connectDb=()=>{
  return mongoose.connect(`${uri}`,{
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


