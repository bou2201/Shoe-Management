import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import argon2 from "argon2";

import Admin from "../models/Admin.js";

dotenv.config();
const SECRET = process.env.SECRET_TOKEN;

export const isLoggedIn = async (req, res) => {
  try {
    const admin = await Admin.findById(req.id).select("-password");

    if (!admin) {
      return res.status(400).json("ID not found !");
    }

    res.status(200).json({ success: true, message: "Verified", admin });
  } catch (err) {
    console.log(err);
    res.status(500).json(`Server error: ${err.message}`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please fully fill in !");
  }

  try {
    const isEmail = await Admin.findOne({ email });

    if (!isEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password !" });
    }

    const isPassword = await argon2.verify(isEmail.password, password);

    if (!isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password !" });
    }

    const token = jwt.sign({ email: isEmail.email, id: isEmail._id }, SECRET);

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json(`Server error: ${err.message}`);
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: true, message: "Please fully fill in !" });
  }

  try {
    const isExist = await Admin.findOne({ email });

    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "This email already exists" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password do NOT match !" });
    }

    const hashedPassword = await argon2.hash(password);
    const newAdmin = await Admin.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: newAdmin.email, id: newAdmin._id }, SECRET);

    res.status(200).json({
      success: true,
      message: "Created account successfully !",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(`Server error: ${err.message}`);
  }
};
