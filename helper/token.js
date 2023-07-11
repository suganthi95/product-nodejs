const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = "SFWERgjEYJSRATHafathrsr";
const JWT_REFRESH_KEY = "ABCDEFGHIJKLlkjihgfedcba";
const JWT_RESET_KEY = "hrdsfdhBtthSGhzfdnfAsdt";

const tokenGenerator = (email) => {
  const token = jwt.sign({ email }, JWT_KEY, { expiresIn: "15 minute" });
  return token;
};

const refreshToken = (email) => {
  jwt.sign({ email }, JWT_REFRESH_KEY, { expiresIn: "1 hour" });
};

const refreshtokenValidator = (token) => {
  const data = jwt.verify(token, JWT_RESET_KEY, { expiresIn: "1 hour" });
  return data;
};

const tokenGen = (email) => {
  const token = jwt.sign({ email }, JWT_RESET_KEY, { expiresIn: "15 minute" });
  return token;
};

const tokenValidator = (token) => {
  const data = jwt.verify(token, JWT_RESET_KEY, { expiresIn: "15 minute" });
  return data;
};

module.exports = {
  tokenGenerator,
  tokenGen,
  tokenValidator,
  refreshToken,
  refreshtokenValidator,
};
