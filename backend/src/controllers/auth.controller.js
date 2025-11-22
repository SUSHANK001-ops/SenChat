import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    
    if (password.length < 6 ) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 6 characters ",
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
      const saveUser = await newUser.save()
      generateToken(saveUser._id,res)
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
