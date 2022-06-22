//generate jwt token for user when they login

import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  return token;
};

export default generateToken;
