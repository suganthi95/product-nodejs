const jwt = require("jsonwebtoken");
const JWT_KEY = "SFWERgjEYJSRATHafathrsr";

const tokenGenerator = (mail_id) => {
  const token = jwt.sign({ mail_id }, JWT_KEY, { expiresIn: "5 minute" });
  return token;
};

/*const tokenValidator = (token) => {
  const data = jwt.verify(token, JWT_KEY);
  return data;
};*/

module.exports =  tokenGenerator;
