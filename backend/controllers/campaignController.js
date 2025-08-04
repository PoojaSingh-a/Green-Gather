const Campaign = require('../models/Campaign');

exports.createCampaign = async(req,res) => {
    try{
        const newCampaign = new Campaign(req.body);
        const saved = await newCampaign.save();
        res.status(201).json(saved);
    }
    catch(err){
        console.error('Error creating campaign:',err);
        res.status(500).json({message:'Failed to create campaign'});
    }
}

exports.getAllCampaign = async(req,res)=>{
    try{
        const campaigns = await Campaign.find();
        console.log('Fetched campaigns:', campaigns); // 👈 add this
        res.status(200).json(campaigns);
    }
    catch(err){
        console.error('Error fetching campaigns:',err);
        res.status(500).json({message:'Server error'});
    }
}
