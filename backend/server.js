const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const campaignRoutes = require('./routes/campaignRoutes');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/campaigns',campaignRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(5000, () => {
        console.log('✅ Server running on port 5000 and connected to MongoDB');
    });
})
.catch((err) => console.error('❌ Database connection failed:', err));
