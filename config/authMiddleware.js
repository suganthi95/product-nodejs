const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_KEY;
const authMiddeleware = async (req, res, next) => {
  if (req.headers.authorization.startsWith("Bearer")) {
    let token = await req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const verify = await jwt.verify(token,`${key}` );
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


