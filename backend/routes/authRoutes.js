const jwt = require("jsonwebtoken");
const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", register);
router.post("/login", login);

router.get("/check-auth", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(404).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ loggedIn: false });

    res.status(200).json({ loggedIn: true, name: user.name, email: user.email });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ loggedIn: false });
  }
});

router.post("/logout",(req,res)=>{
  res.clearCookie("token",{
    httpOnly:true,
    secure:false,
    sameSite:"Lax",
  });
  res.status(200).json({msg:"Logged out successfully"});
})

module.exports = router;
