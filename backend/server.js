const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/campaigns',campaignRoutes);

mongoose.connect('mongodb://localhost:27017/GreenSpark', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    app.listen(5000, () =>{
        console.log('Server running on port 5000.');
    });
})
.catch((err)=> console.error('Database connection failed:', err));