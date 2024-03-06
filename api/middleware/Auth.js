/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    var decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decoded.id });
    if (user) {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

const authorizeRole = async(req,res,next) => {
  try {
    const { access_token } = req.cookies;
    var decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decoded.id });
    // console.log(user)
    if(user.role == "admin"){
      return next()
    }
    return next(errorHandler(403 , "your are not authorized to perform this task"))
  }
  catch (error) {
    next(error)
  }
}
export  {isAuthenticatedUser , authorizeRole }
