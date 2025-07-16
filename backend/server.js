const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect()
.then(()=>{
    app.listen(5000, () =>{
        console.log('Server running on port 5000.');
    });
})
.catch((err)=> console.error('Database connection failed:', err));