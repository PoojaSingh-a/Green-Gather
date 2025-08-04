const express = require('express');
const router = express.Router();
const { createCampaign, getAllCampaign } = require('../controllers/campaignController');

router.post('/create',createCampaign);
router.get("/",getAllCampaign);

module.exports = router;