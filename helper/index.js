const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const generateAuthToken = ({ _id: userId }) => {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

module.exports = {
  generateAuthToken,
};
