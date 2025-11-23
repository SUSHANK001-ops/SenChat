import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const{JWT_SECRET,NODE_ENV} = ENV;
  if(!JWT_SECRET){
    throw new Error("JWT secrect is missing!!!!")
  }
  const token = jwt.sign({ userId: userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //Prevent xss attacks: Cross-site scripting
    sameSite: "strict", //CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });
  return token;
};
