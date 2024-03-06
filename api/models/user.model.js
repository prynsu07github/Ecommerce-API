import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceeded 30 character "],
    minLength: [4, "Name should have more than 4 charater"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
    validate: {
      validator: function(value) {
          return validator.isEmail(value);
      },
      message: "Please enter a valid email"
  }
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have minimum 8 charaters"],
  },
  avatar:{
    type:String,
  },
  role:{
    type:String,
    default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});

const User = mongoose.model("User", userSchema);

export default User;
