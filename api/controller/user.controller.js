/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

//register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const encrytedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: encrytedPassword,
    });
    res.status(201).json({
      sucess: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const verifiedPass = bcrypt.compareSync(password, validUser.password);
    if (!verifiedPass) {
      return next(errorHandler(404, "invalid email or password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expireAt = 24*60*60*1000
    const {password:pass , ...rest } = validUser._doc
    res
      .cookie("access_token", token , { maxAge: expireAt, httpOnly: true })
      .status(200)
      .json({
        sucess: true,
        rest,
      });
  } catch (error) {
    next(error);
  }
};

//logout user
const logOutUser = async(re,res,next)=>{
  try {
    res.cookie("access_token" , null)
    res.status(200).json({
      sucess:true,
      message:"User logged out"
    })
  } catch (error) {
    next(error)
  }
}

//forget password
const forgetPassword = async(req , res , next) => {
  const email = req.body.email
  const user = await User.findOne({email})
  if(!user){
    return next(errorHandler(404 , "User not found"))
  }
  const token = jwt.sign({id : user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1000});
  const tokenExpire = new Date().getTime()+ 10*60*1000
  user.resetPasswordToken = token
  user.resetPasswordExpire = tokenExpire
  await user.save()
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${token}`
  const subject = "Ecommerce password recovery",
  message = `Your password reset toke is :- \n\n ${resetPasswordUrl} \n\n If ypur have not requested for passwod recovery, please ignore it.`
  try {
   await sendEmail({email , subject , message})
   res.status(200).json({
    sucess:true,
    message:`email sent to ${email} successfully`
   })
  } catch (error) {
    next(error)
  }
}

//reset
const resetPassword = async(req,res,next) => {
  try {
    const token = req.params.token
    const currentTime = new Date().getTime()
    const user = await User.findOne({resetPasswordToken : token , resetPasswordExpire : {$gt:currentTime}})
    if(!user){
      next(errorHandler(400 , "Reset password token is invalid or has been expired"))
    }
    if(req.body.password !== req.body.confirmPassword){
      next(errorHandler(400 , "Password doest not matched"))
    }
    const encrytedPassword = bcrypt.hashSync( req.body.password, 10);
    user.password = encrytedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.status(200).json({
      sucess:true,
      message:"password changed successfuly",
      user
    })
  } catch (error) {
    next(error)
  }
}

export { registerUser, loginUser, logOutUser, forgetPassword , resetPassword};
