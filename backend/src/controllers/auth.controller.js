import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters ",
      });
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exist" });
    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      // generateToken(newUser._id, res);
      // await newUser.save();
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        ProfilePic: newUser.ProfilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({message:"Email and Password are required"})
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    //never tell the client which one is incorrect: password or email
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      ProfilePic: user.ProfilePic,
    });
  } catch (error) {
    console.error("Error in login controller",error)
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout =  (_, res) => {
res.cookie("jwt","",{maxAge:0})
res.status(200).json({message:"Logged out successfully"})
};
export const updateProfile = async(req,res) =>{
  try {
    const {ProfilePic} = req.body;
    if(!ProfilePic) return res.status(400).json({message:"Profile pic is required"})
      const userId = req.user._id;
    const uploadRespond = await cloudinary.uploader.upload(ProfilePic)
    const updatedUser = await User.findByIdAndUpdate(userId ,{ProfilePic:uploadRespond.secure_url},{new:true})
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in update profile",error);
    res.status(500).json({message:"internal server error"})
    
    
  }
}