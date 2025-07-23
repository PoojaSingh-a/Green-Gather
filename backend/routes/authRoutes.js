const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

const JWT_SECRET = "myverysecuresecretkey";

router.post("/register", register);
router.post("/login", login);

router.get("/check-auth", (req, res) => {
  console.log("Cookies received:", req.cookies);  
  const token = req.cookies.token;
  if (!token) return res.status(404).json({ loggedIn: false });

  try {
   // const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ loggedIn: true, userId: "Pooja" });
  } catch (err) {
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
