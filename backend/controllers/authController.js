const User = require("../models/User");
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        {id:userId}, 
        process.env.JWT_SECRET,
        { expiresIn: '7d',}
    );
}

exports.register = async(req,res) => {
    const {name, email, password} = req.body;
    try{
        const existing = await User.findOne({email});
        if(existing)
            return res.status(400).json({msg:"User already exists"});
        const user = await User.create({name, email, password});
        res.status(201).json({user, token: generateToken(user._id)});
    } 
    catch(err){
        res.status(500).json({msg:"Registration failed", error: err.message});
    }
}

exports.login = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password)))
            return res.status(400).json({msg: "Invalid credentials"});
        res.json({user, token:generateToken(user._id)});
    }
    catch(err){
        res.status(500).json({msg:"Login failed", error: err.message});
    }
}

const authController = () => {
  return (
    <div>
      
    </div>
  )
}
export default authController;
