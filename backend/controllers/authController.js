const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Received:", name, email, password);
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }
    console.log("Creating new user");
    const user = await User.create({ name, email, password });
    console.log("User created:", user);
    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (err) {
    console.log("In catch block");
    console.error("Registration Error:", err);
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ msg: "Invalid credentials" });
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user._doc;
    res.status(200).json({ msg: "Login successful", user: userData });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};
