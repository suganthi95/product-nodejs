const jwt = require("jsonwebtoken");
JWT_KEY = "SFWERgjEYJSRATHafathrsr";

const authMiddeleware = async (req, res, next) => {
  if (req.headers.authorization.startsWith("Bearer")) {
    let token = await req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const verify = await jwt.verify(token, JWT_KEY);
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


