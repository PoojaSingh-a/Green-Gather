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