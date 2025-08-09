const Campaign = require("../models/Campaign");
require('dotenv').config();
const nodemailer = require('nodemailer');

exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    const saved = await newCampaign.save();
    //email sending
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: `Thanks for creating a campaign: ${req.body.title}`,
      html: `
            <h2>Hello ${req.body.name},</h2>
            <p>Thank you for creating a campaign on GreenSpark.</p>
            <p><strong>Title:</strong> ${req.body.title}</p>
            <p><strong>Date:</strong> ${req.body.date}</p>
            <p><strong>Location:</strong> ${req.body.location}</p>
            <p><strong>Description:</strong> ${req.body.description}</p>
            <br/>
            <p>We appreciate your effort towards a greener planet 🌱</p>
            <p>– GreenSpark Team</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ message: "Failed to create campaign" });
  }
};

exports.getAllCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    console.log("Fetched campaigns:", campaigns);
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    res.status(500).json({ message: "Server error" });
  }
};
