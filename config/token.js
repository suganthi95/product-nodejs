const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = "SFWERgjEYJSRATHafathrsr"
const JWT_RESET_KEY = "hrdsfdhBtthSGhzfdnfAsdt"
const tokenGenerator = (email) => {
  const token = jwt.sign({ email }, JWT_KEY, { expiresIn: "15 minute" });
  return token;
};


const tokenGen = (email)=>{
  const token = jwt.sign({ email }, JWT_RESET_KEY, { expiresIn: "15 minute" });
  return token;
}

const tokenValidator = (token) => {
  const data = jwt.verify(token, JWT_RESET_KEY,{expiresIn:"15 minute"});
  return data;
};

module.exports = { tokenGenerator,tokenGen,tokenValidator};
