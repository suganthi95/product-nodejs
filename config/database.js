// database configuration code here 
const { MongoClient } =require( "mongodb");

const url ="mongodb://127.0.0.1:27017";
const database = "HouseHoldProduct";
const client = new MongoClient(url);

async function connectDb(){
    let result = await client.connect();
      return  result.db(database);
    };
module.exports= connectDb;
//export default connectDb;


