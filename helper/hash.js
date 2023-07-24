const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT=10;

const hashGenerate = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (err) {
    return err;
  }
};

const hashValidator = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (err) {
    return err;
  }
};
module.exports = { hashGenerate, hashValidator };
