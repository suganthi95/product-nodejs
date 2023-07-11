const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = "SFWERgjEYJSRATHafathrsr";
const JWT_REFRESH_KEY = "ABCDEFGHIJKLlkjihgfedcba";


const authMiddeleware = async (req, res, next) => {   //.startsWith("Bearer")
  if (req.headers.authorization) {
    let token = await req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const verify = jwt.verify(token,JWT_KEY );
      }
      next();
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("No token attached");
  }
};

module.exports = authMiddeleware;




/*const authMiddeleware = async (req, res, next) => {
  try {
    const{ jwt } =  req.cookies;
    const valid = await tokenValidator(jwt);
    if (valid) {
      next();
    } else {
      res.send("Access Denied");
    }
  } catch (err) {
    res.send(err);
  }
};*/


